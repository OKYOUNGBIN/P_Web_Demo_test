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
Groups.add(Group1, Group2)
scene.add(Groups)

//transformControl.object === undefined || transformControl.object !== object
transformControl.addEventListener( 'change', render );
renderer.domElement.addEventListener( 'mousedown', clickEvent );
function clickEvent( e ) {
      pointer.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
      pointer.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
      raycaster.setFromCamera( pointer, camera );
      let intersects = raycaster.intersectObjects( [Groups], true);
      if ( intersects.length > 0 ) {
        let object = intersects[0].object;
        for(let i = 0; i < object.parent.parent.children.length; i++){
          console.log(object.parent.parent.children[i])
          if (  object.parent.parent.children[i].visible == true || object.parent.parent.children[i].scale == 1,1,1){
            transformControl.attach(object.parent.parent)
          }
        }    
      }
}

const sizeXInput = document.getElementById("sizeX")
const sizeYInput = document.getElementById("sizeY")
const sizeZInput = document.getElementById("sizeZ")

const posXInput = document.getElementById("posX")
const posYInput = document.getElementById("posY")
const posZInput = document.getElementById("posZ")

const pos2XInput = document.getElementById("pos2X")
const pos2YInput = document.getElementById("pos2Y")
const pos2ZInput = document.getElementById("pos2Z")

const rotXInput = document.getElementById("rotX")
const rotYInput = document.getElementById("rotY")
const rotZInput = document.getElementById("rotZ")

function objToggle(index) {
  //const { children } = Group1;
  for (let i = 0; i < Group1.children.length; i++) {
    if (i !== index) {
      Group1.children[i].visible = false;
      Group1.children[i].scale.set(0,0,0);
    }else if(i == index){
      Group1.children[index].visible = true;
      Group1.children[index].scale.set(1, 1, 1);
      
      box.setFromObject( Group1.children[i], Group1.children[i])
      box.getSize(measure);
      scene.add( helper );
      sizeXInput.value = measure.x
      sizeYInput.value = measure.y
      sizeZInput.value = measure.z
    }
  }
}

function objToggle2(index) {
  for (let i = 0; i < Group2.children.length; i++) {
    if (i !== index) {
      Group2.children[i].visible = false;
      Group2.children[i].scale.set(0,0,0);
    }else if(i == index){
      Group2.children[index].visible = true;
      Group2.children[index].scale.set(1, 1, 1);
  
      box.setFromObject( Group2.children[i], Group2.children[i])
      box.getSize(measure);
      scene.add( helper );
      sizeXInput.value = measure.x
      sizeYInput.value = measure.y
      sizeZInput.value = measure.z
    }
  }
}

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
    Group1.children[i].children[0].position.set(0,0,0)
  }
  for (let i = 0; i < Group1.children.length; i++) {
    if(Group1.children[i].visible === false || Group1.children[i].scale === 0,0,0){
      transformControl.detach(Group1.children[i].children[0])
    }
  }
});

document.getElementById("reset2").addEventListener("click", function () {
  for(var i = 0; i < Group2.children.length; i++){
    Group2.children[i].visible = false;
  }
  for(var i = 0; i < Group2.children.length; i++){
    Group2.children[i].scale.set(0,0,0)
    Group2.children[i].children[0].position.set(0,0,0)
  }
  for (let i = 0; i < Group2.children.length; i++) {
    if(Group2.children[i].visible === false || Group2.children[i].scale === 0,0,0){
      transformControl.detach(Group2.children[i])
    }
  }
});

function transformObj2 () {
  for(let i = 0; i < Group2.children.length; i++){    
    let worldPosition = new THREE.Vector3();
    Group2.children[i].children[0].getWorldPosition( worldPosition );
    posXInput.value = worldPosition.x
    posYInput.value = worldPosition.y
    posZInput.value = worldPosition.z

    var worldRotate = new THREE.Quaternion()
    Group2.children[i].children[0].getWorldQuaternion( worldRotate );
    let rotation = new THREE.Euler()
    rotation.setFromQuaternion(worldRotate)
    //console.log(rotation )

    //rotXInput.value = worldRotate.x
    //rotYInput.value = worldRotate.y
    //rotZInput.value = worldRotate.z
  }
}

document.getElementById("leg_type1").addEventListener("click", function () { objToggle(0);});

document.getElementById("leg_type2").addEventListener("click", function () { objToggle(1);});

document.getElementById("leg_type3").addEventListener("click", function () { objToggle(2);});

document.getElementById("seat_type1").addEventListener("click", function () {objToggle2(0);});

document.getElementById("seat_type2").addEventListener("click", function () {objToggle2(1);});

document.getElementById("seat_type3").addEventListener("click", function () {objToggle2(2);});

document.getElementById("seat_type4").addEventListener("click", function () {objToggle2(3);});

function animate2(){
  //transformObj1();
  // if(){
  //   transformObj2();
  // }
  requestAnimationFrame(animate2);
}

animate2();