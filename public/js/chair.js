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

let box1 = new THREE.Box3();
let box2 = new THREE.Box3();
let measure1 = new THREE.Vector3();
let measure2 = new THREE.Vector3();
let helper1 = new THREE.Box3Helper( box1, 0xff0000 );
let helper2 = new THREE.Box3Helper( box2, 0xff0000 );

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

let sizeXInput = document.getElementById("sizeX")
let sizeYInput = document.getElementById("sizeY")
let sizeZInput = document.getElementById("sizeZ")

let posXInput = document.getElementById("posX")
let posYInput = document.getElementById("posY")
let posZInput = document.getElementById("posZ")

let rotXInput = document.getElementById("rotX")
let rotYInput = document.getElementById("rotY")
let rotZInput = document.getElementById("rotZ")

let scaleXInput = document.getElementById("scaleX")
let scaleYInput = document.getElementById("scaleY")
let scaleZInput = document.getElementById("scaleZ")

function objToggle1(index) {
  for (let i = 0; i < Group1.children.length; i++) {
    if (i !== index) {
      Group1.children[i].visible = false;
      Group1.children[i].scale.set(0,0,0);
    }else if(i == index){
      Group1.children[index].visible = true;
      Group1.children[index].scale.set(1, 1, 1);
      
      box2.setFromObject( Group1, Group1)
      box2.getSize(measure1);
      scene.add( helper1 );
    }
  }
  Group1Transform();
}

function objToggle2(index) {
  for (let i = 0; i < Group2.children.length; i++) {
    if (i !== index) {
      Group2.children[i].visible = false;
      Group2.children[i].scale.set(0,0,0);
    }else if(i == index){
      Group2.children[index].visible = true;
      Group2.children[index].scale.set(1, 1, 1);
      
      box2.setFromObject( Group2, Group2)
      box2.getSize(measure2);
      scene.add( helper2 );
    }
  }
  Group2Transform()
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
    Group1.children[i].scale.set(0,0,0)
    transformControl.detach()
  }
});

document.getElementById("reset2").addEventListener("click", function () {
  for(var i = 0; i < Group2.children.length; i++){
    Group2.children[i].visible = false;
    Group2.children[i].scale.set(0,0,0)
    transformControl.detach()
  }
});


document.getElementById("leg_type1").addEventListener("click", function () { objToggle1(0);});

document.getElementById("leg_type2").addEventListener("click", function () { objToggle1(1);});

document.getElementById("leg_type3").addEventListener("click", function () { objToggle1(2);});

document.getElementById("seat_type1").addEventListener("click", function () {objToggle2(0);});

document.getElementById("seat_type2").addEventListener("click", function () {objToggle2(1);});

document.getElementById("seat_type3").addEventListener("click", function () {objToggle2(2);});

document.getElementById("seat_type4").addEventListener("click", function () {objToggle2(3);});

function clickEvent( e ) {
  pointer.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  pointer.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );
  let intersects = raycaster.intersectObjects( [Groups], true);
  if ( intersects.length > 0 ) {
    let object = intersects[0].object;
    transformControl.attach(object.parent.parent)
  }
  if(transformControl.object == Group2){
    Group2Transform();
  }else if(transformControl.object == Group1){
    Group1Transform();
  }
}

function Group1Transform(){
  transformControl.addEventListener("change", function () {
    sizeXInput.value = (measure1.x * 100).toFixed(2).concat(" cm")
    sizeYInput.value = (measure1.y * 100).toFixed(2).concat(" cm")
    sizeZInput.value = (measure1.z * 100).toFixed(2).concat(" cm") 

    posXInput.value = Group1.position.x
    posYInput.value = Group1.position.y
    posZInput.value = Group1.position.z

    rotXInput.value = Group1.rotation.x
    rotYInput.value = Group1.rotation.y
    rotZInput.value = Group1.rotation.z
  });
}

function Group2Transform(){
  transformControl.addEventListener("change", function () {
    sizeXInput.value = (measure2.x * 100).toFixed(2).concat(" cm")
    sizeYInput.value = (measure2.y * 100).toFixed(2).concat(" cm")
    sizeZInput.value = (measure2.z * 100).toFixed(2).concat(" cm")

    posXInput.value = Group2.position.x
    posYInput.value = Group2.position.y
    posZInput.value = Group2.position.z

    rotXInput.value = Group2.rotation.x
    rotYInput.value = Group2.rotation.y
    rotZInput.value = Group2.rotation.z
  });
}

function Group1UpdateTransform(){
  box1.setFromObject( Group1, Group1)
  box1.getSize(measure1);

  Group1.position.x = parseFloat(posXInput.value) || Group1.position.x
  Group1.position.y = parseFloat(posYInput.value) || Group1.position.y
  Group1.position.z = parseFloat(posZInput.value) || Group1.position.z

  Group1.rotation.x = parseFloat(rotXInput.value) || Group1.rotation.x
  Group1.rotation.y = parseFloat(rotYInput.value) || Group1.rotation.y
  Group1.rotation.z = parseFloat(rotZInput.value) || Group1.rotation.z
}

function Group2UpdateTransform(){
  box2.setFromObject( Group2, Group2)
  box2.getSize(measure2);

  Group2.position.x = parseFloat(posXInput.value) || Group2.position.x
  Group2.position.y = parseFloat(posYInput.value) || Group2.position.y
  Group2.position.z = parseFloat(posZInput.value) || Group2.position.z

  Group2.rotation.x = parseFloat(rotXInput.value) || Group2.rotation.x
  Group2.rotation.y = parseFloat(rotYInput.value) || Group2.rotation.y
  Group2.rotation.z = parseFloat(rotZInput.value) || Group2.rotation.z
}

renderer.domElement.addEventListener( 'click', clickEvent );

function animate2(){
  Group2UpdateTransform();
  Group1UpdateTransform();
  requestAnimationFrame(animate2);
}

animate2();