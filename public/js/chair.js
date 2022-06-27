import * as THREE from "/three/build/three.module.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "/three/examples/jsm/exporters/GLTFExporter.js";
import {
  scene,
  camera,
  renderer,
  oribitControls,
  transformControl,
  raycaster, pointer,
  render,
} from "/index.js";


function loadModelUsingPromise(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}

let Group1 = new THREE.Group();
let Group2 = new THREE.Group();
let Group3 = new THREE.Group();
let Groups = new THREE.Group();

let box = new THREE.Box3();
let measure = new THREE.Vector3();
let helper = new THREE.Box3Helper( box, 0xff0000 );

Promise.all([
  loadModelUsingPromise("/chair/leg/tablechair_0101_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0102_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0103_leg.glb"),
  
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group1.add(results[j].scenes[0]);
    Group1.children[j].visible = false;
    Group1.children[j].scale.set(0,0,0)
  }
});

Promise.all([
  loadModelUsingPromise("/chair/seat/tablechair_0201_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0202_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0203_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0204_seat.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group2.add(results[j].scenes[0]);
    Group2.children[j].visible = false;
    Group2.children[j].scale.set(0,0,0)
  }
});
Groups.add(Group1,Group2, Group3)
scene.add(Groups)
var editorHistory = new UndoManager();

transformControl.addEventListener( 'change', render );
renderer.domElement.addEventListener( 'mousedown', clickEvent );

function clickEvent( e ) {
      pointer.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
      pointer.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      var intersects = raycaster.intersectObjects( [Groups], true);
      if ( intersects.length > 0 ) {
        let object = intersects[0].object;
          if ( transformControl.object === undefined || transformControl.object !== object ){
            transformControl.attach(object)
          }
        }
        
}

const sizeXInput = document.getElementById("sizeX")
const sizeYInput = document.getElementById("sizeY")
const sizeZInput = document.getElementById("sizeZ")


function toggle1(index) {
  const { children } = Group1;
  for (let i = 0; i < children.length; i++) {
    if (i !== index) {
      children[i].visible = false;
      children[i].scale.set(0,0,0);
    }else if(i == index){
      children[index].visible = true;
      children[index].scale.set(1, 1, 1);
      
      box.setFromObject( children[i], children[i])
      scene.add( helper);
      box.getSize(measure);
      sizeXInput.value = measure.x
      sizeYInput.value = measure.y
      sizeZInput.value = measure.z
      console.log(box.getSize(measure))
    }
  }
}

function toggle2(index) {
  const { children } = Group2;
  for (let i = 0; i < children.length; i++) {
    if (i !== index) {
      children[i].visible = false;
      children[i].scale.set(0,0,0);
    }else if(i == index){
      children[index].visible = true;
      children[index].scale.set(1, 1, 1);

      box.setFromObject( children[i], children[i])
      box.getSize(measure);
      sizeXInput.value = measure.x
      sizeYInput.value = measure.y
      sizeZInput.value = measure.z
      scene.add( helper );
    }
  }
}

// var oldObjData = null;
// var newObjData = null;
// transformControl.addEventListener( 'mouseDown', function(e) {
//        oldObjData = getObjectData([Group1.children, Group2.children]);
//  } );
//  transformControl.addEventListener( 'mouseUp', function(e) {
//         newObjData = getObjectData([Group1.children, Group2.children]);
//  } );
//  transformControl.addEventListener( 'dragging-changed', function ( e ) {
//         if(e.value === false) { // End dragging
//             addHistory(oldObjData, newObjData); // Store undo/redo
//         }
//  } );
 
//  let copyObj = []
//  function getObjectData(obj) {
//   console.log(obj)
//   var data = {
//         uuid: obj.uuid, // Important, used in addHistory.
//         position: copyObj({x: obj.position.x, y: obj.position.y, z: obj.position.z}),
//         rotation: copyObj({x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z}),
//         scale: copyObj({x: obj.scale.x, y: obj.scale.y, z: obj.scale.z}),
//         opacity: Number(obj.userData.opacity),
//     };
//     return data;
// }

// function addHistory(oldObjData , newObjData ) {
//   if(oldObjData && newObjData && oldObjData.uuid == newObjData.uuid) {
//         editorHistory.add({
//             undo: function() {
//                 resetObject(oldObjData);
//             },
//             redo: function() {
//                 resetObject(newObjData);
//             }
//         });
//     }
// }

// function resetObject(data) {
//   var nowObj = // you can find object by data.uuid.
//   nowObj.position.x = data.position.x;
//   nowObj.position.y = data.position.y;
//   nowObj.position.z = data.position.z;
//   nowObj.rotation.x = data.rotation.x;
//   nowObj.rotation.y = data.rotation.y;
//   nowObj.rotation.z = data.rotation.z;
//   nowObj.scale.x = data.scale.x;
//   nowObj.scale.y = data.scale.y;
//   nowObj.scale.z = data.scale.z;
// }

const { tempUrl } = await fetch("/s3UrlTemp").then((res) => res.json()); // 원본 glb s3 bucket
//다운로드 버튼 생성 후 이벤트 추가
const btn = document.querySelector(".download-glb");
btn.addEventListener("click", uploadTempS3);
//gltfExporter을 이용해 생성된 버튼
function uploadTempS3(event) {
  event.preventDefault();
  window.scrollTo({
    top: 2928,
    behavior: "smooth",
  });
  const exporter = new GLTFExporter();
  // 배열에 여러가지 gltf변수 넣기[]
  exporter.parse(
    [Groups],
    // 해당 씬을 저장
    async function (result) {
      await fetch(tempUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: result,
      });
      const tempGlbUrl = tempUrl.split("?")[0];
      console.log(tempGlbUrl);

      const model = document
        .querySelector("#editing_adapter")
        .shadowRoot.querySelector("model-viewer");
      model.src = tempGlbUrl;
    },
    { binary: true }
  );
}

document.getElementById("reset1").addEventListener("click", function () {
  for(var i = 0; i < Group1.children.length; i++){
    Group1.children[i].visible = false;
  }
  for(var i = 0; i < Group1.children.length; i++){
    Group1.children[i].scale.set(0,0,0)
  }
  Group1.children[0].position.set(0,0,0)
  Group1.children[1].position.set(0,0,0)
  Group1.children[2].position.set(0,0,0)
});

document.getElementById("reset2").addEventListener("click", function () {
  for(var i = 0; i < Group2.children.length; i++){
    Group2.children[i].visible = false;
  }
  for(var i = 0; i < Group2.children.length; i++){
    Group2.children[i].scale.set(0,0,0)
  }
  Group2.children[3].position.set(0,0,0)
  Group2.children[2].position.set(0,0,0)
  Group2.children[1].position.set(0,0,0)
  Group2.children[0].position.set(0,0,0)
});

document.getElementById("leg_type1").addEventListener("click", function () { toggle1(0);});

document.getElementById("leg_type2").addEventListener("click", function () { toggle1(1);});

document.getElementById("leg_type3").addEventListener("click", function () { toggle1(2);});

document.getElementById("seat_type1").addEventListener("click", function () {toggle2(0);});

document.getElementById("seat_type2").addEventListener("click", function () {toggle2(1);});

document.getElementById("seat_type3").addEventListener("click", function () {toggle2(2);});

document.getElementById("seat_type4").addEventListener("click", function () {toggle2(3);});