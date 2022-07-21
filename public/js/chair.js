import * as THREE from "/three/build/three.module.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "/three/examples/jsm/exporters/GLTFExporter.js";
import { TextGeometry } from "/three/examples/jsm/geometries/TextGeometry.js" 
import {
  scene,
  camera,
  renderer,
  oribitControls,
  transformControl,
  raycaster,
  pointer,
  render,
  canvas,
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
let worldPosition = new THREE.Vector3();
let helper1 = new THREE.Box3Helper(box1, 0xff0000);
let helper2 = new THREE.Box3Helper(box2, 0xff0000);

Promise.all([
  loadModelUsingPromise("/chair/leg/tablechair_0101_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0102_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0103_leg.glb"),
]).then((results) => {
  for (let j = 0; j < results.length; j++) {
    Group1.add(results[j].scenes[0]);
    Group1.children[j].visible = false;
    Group1.children[j].scale.set(0, 0, 0);
  }
});

Promise.all([
  loadModelUsingPromise("/chair/seat/tablechair_0201_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0202_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0203_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0204_seat.glb"),
]).then((results) => {
  for (let j = 0; j < results.length; j++) {
    Group2.add(results[j].scenes[0]);
    Group2.children[j].visible = false;
    Group2.children[j].scale.set(0, 0, 0);
  }
});
Groups.add(Group1, Group2);
scene.add(Groups);

let sizeXInput = document.getElementById("sizeX");
let sizeYInput = document.getElementById("sizeY");
let sizeZInput = document.getElementById("sizeZ");

let posXInput = document.getElementById("posX");
let posYInput = document.getElementById("posY");
let posZInput = document.getElementById("posZ");

let rotXInput = document.getElementById("rotX");
let rotYInput = document.getElementById("rotY");
let rotZInput = document.getElementById("rotZ");

let scaleXInput = document.getElementById("scaleX");
let scaleYInput = document.getElementById("scaleY");
let scaleZInput = document.getElementById("scaleZ");

let inputs = document.getElementsByClassName("inputs");

function objToggle1(index) {
  for (let i = 0; i < Group1.children.length; i++) {
    if (i !== index) {
      Group1.children[i].visible = false;
      Group1.children[i].scale.set(0, 0, 0);
    } else if (i == index) {
      Group1.children[index].visible = true;
      Group1.children[index].scale.set(1, 1, 1);
    }
  }
}

function objToggle2(index) {
  for (let i = 0; i < Group2.children.length; i++) {
    if (i !== index) {
      Group2.children[i].visible = false;
      Group2.children[i].scale.set(0, 0, 0);
    } else if (i == index) {
      Group2.children[index].visible = true;
      Group2.children[index].scale.set(1, 1, 1);
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
        .querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer");
      model.src = tempGlbUrl;
    },
    { binary: true }
  );
}

document.getElementById("reset1").addEventListener("click", function () {
  for (let i = 0; i < Group1.children.length; i++) {
    Group1.children[i].visible = false;
    Group1.children[i].scale.set(0, 0, 0);
    Group1.position.set(0, 0, 0);
    scene.remove(helper1);
    transformControl.detach();
  }
});

document.getElementById("reset2").addEventListener("click", function () {
  for (let i = 0; i < Group2.children.length; i++) {
    Group2.children[i].visible = false;
    Group2.children[i].scale.set(0, 0, 0);
    Group2.position.set(0, 0, 0);
    scene.remove(helper2);
    transformControl.detach();
  }
});

document.getElementById("leg_type1").addEventListener("click", function () {  objToggle1(0);});

document.getElementById("leg_type2").addEventListener("click", function () {  objToggle1(1);});

document.getElementById("leg_type3").addEventListener("click", function () {  objToggle1(2);});

document.getElementById("seat_type1").addEventListener("click", function () {  objToggle2(0);});

document.getElementById("seat_type2").addEventListener("click", function () {  objToggle2(1);});

document.getElementById("seat_type3").addEventListener("click", function () {  objToggle2(2);});

document.getElementById("seat_type4").addEventListener("click", function () {  objToggle2(3);});

renderer.domElement.addEventListener("click", clickEvent);

// undo
let objData1 = [];
let objData2 = [];

let xPosData1 = [];
let yPosData1 = [];
let zPosData1 = [];

let xRotData1 = [];
let yRotData1 = [];
let zRotData1 = [];

let xScaleData1 = [];
let yScaleData1 = [];
let zScaleData1 = [];

let xPosData2 = [];
let yPosData2 = [];
let zPosData2 = [];

let xRotData2 = [];
let yRotData2 = [];
let zRotData2 = [];

let xScaleData2 = [];
let yScaleData2 = [];
let zScaleData2 = [];

let objSlice1
let objSlice2

let xPosSlice1, yPosSlice1, zPosSlice1, xPosSlice2, yPosSlice2, zPosSlice2
let xRotSlice1, yRotSlice1, zRotSlice1, xRotSlice2, yRotSlice2, zRotSlice2
let oldXPosData1, oldYPosData1, oldZPosData1, oldXPosData2, oldYPosData2, oldZPosData2

let oldObjData1, oldObjData2
// redo
let saveObjData1 = [];
let saveObjData2 = [];

let redoObjSlice1
let redoObjSlice2

let newObjData1, newObjData2

let saveXPosData1 = [];
let saveYPosData1 = [];
let saveZPosData1 = [];

let saveXPosData2 = [];
let saveYPosData2 = [];
let saveZPosData2 = [];

let redoXPosSlice1, redoYPosSlice1, redoZPosSlice1, redoXPosSlice2, redoYPosSlice2, redoZPosSlice2
let newXPosData1, newYPosData1, newZPosData1, newXPosData2, newYPosData2, newZPosData2


function clickEvent(e) {
  pointer.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
  pointer.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects([Groups], true);
  if (intersects.length > 0) {
    let object = intersects[0].object;
    let objParent = object.parent.parent;
    transformControl.attach(objParent);
    if (transformControl.object == Group1) {
      transformControl.detach();
      Group1Transform();
      transformControl.attach(objParent);
    } else if (transformControl.object == Group2) {
      transformControl.detach();
      Group2Transform();
      transformControl.attach(objParent);
    }
  }
}

transformControl.addEventListener("mouseDown", objUndo)

for(let i = 0; i < inputs.length; i++){
  inputs[i].onchange = function(){
    objUndo();
  }
}

function objUndo(){
  if(transformControl.object == Group1){
    for(let i = 0; i < inputs.length; i++){
      objData1.push(inputs[i].value)
    }
    objSlice1 = objData1.slice(Math.max(0, objData1.length - 90));
    console.log(objSlice1)
    // xPosData1.push(posXInput.value);
    // yPosData1.push(posYInput.value);
    // zPosData1.push(posZInput.value);

    // xPosSlice1 = xPosData1.slice(Math.max(0, xPosData1.length - 10));
    // yPosSlice1 = yPosData1.slice(Math.max(0, yPosData1.length - 10));
    // zPosSlice1 = zPosData1.slice(Math.max(0, zPosData1.length - 10));
    // console.log("down1", xPosSlice1, yPosSlice1, zPosSlice1)
    
  } else if(transformControl.object == Group2){
    for(let i = 0; i < inputs.length; i++){
      objData2.push(inputs[i].value)
    }
    objSlice2 = objData2.slice(Math.max(0, objData2.length - 90));
    console.log(objSlice2)
    // xPosData2.push(posXInput.value);
    // yPosData2.push(posYInput.value);
    // zPosData2.push(posZInput.value);

    // xPosSlice2 = xPosData2.slice(Math.max(0, xPosData2.length - 10));
    // yPosSlice2 = yPosData2.slice(Math.max(0, yPosData2.length - 10));
    // zPosSlice2 = zPosData2.slice(Math.max(0, zPosData2.length - 10));
    // console.log("down2", xPosSlice2, yPosSlice2, zPosSlice2)
  }
}

document.getElementById("undo").addEventListener("click", function(){
  if(transformControl.object == Group1){
    if (posXInput.value == "0") {
      Group1.position.x = "0";
    }
    if (posYInput.value == "0") {
      Group1.position.y = "0";
    }
    if (posZInput.value == "0") {
      Group1.position.z = "0";
    }
    for(let i = inputs.length - 1; i >= 0; i --){
      oldObjData1 = objSlice1.pop()
      inputs[i].value = oldObjData1 ? oldObjData1 : inputs[i].value
      console.log("언두 한거1", oldObjData1)
    }
    for(let i = 0; i < inputs.length; i++){
      saveObjData1.push(inputs[i].value);
      redoObjSlice1 = saveObjData1.slice(Math.max(0, saveObjData1.length - 90));
      console.log("언두 배열에 넣기1", redoObjSlice1)
    }
    // oldXPosData1 = xPosSlice1.pop();
    // posXInput.value = oldXPosData1 ? oldXPosData1 : posXInput.value
    // oldYPosData1 = yPosSlice1.pop();
    // posYInput.value = oldYPosData1 ? oldYPosData1 : posYInput.value
    // oldZPosData1 = zPosSlice1.pop();
    // posZInput.value = oldZPosData1 ? oldZPosData1 : posZInput.value

    // saveXPosData1.push(oldXPosData1)
    // saveYPosData1.push(oldYPosData1)
    // saveZPosData1.push(oldZPosData1)

    // redoXPosSlice1 = saveXPosData1.slice(Math.max(0, saveXPosData1.length - 10));
    // redoYPosSlice1 = saveYPosData1.slice(Math.max(0, saveYPosData1.length - 10));
    // redoZPosSlice1 = saveZPosData1.slice(Math.max(0, saveZPosData1.length - 10));

    // console.log(redoXPosSlice1,redoYPosSlice1,redoZPosSlice1)
  }else if(transformControl.object == Group2){
    for(let i = inputs.length - 1; i >= 0; i --){
      oldObjData2 = objSlice2.pop()
      inputs[i].value = oldObjData2 ? oldObjData2 : inputs[i].value
      console.log("언두 한거2",oldObjData2)
    }
    console.log(oldObjData2)
    for(let i = 0; i < inputs.length; i++){
      saveObjData2.push(inputs[i].value);
      redoObjSlice2 = saveObjData2.slice(Math.max(0, saveObjData2.length - 90));
      console.log("언두 배열에 넣기2", redoObjSlice2)
    }
    // oldXPosData2 = xPosSlice2.pop();
    // posXInput.value = oldXPosData2 ? oldXPosData2 : posXInput.value
    // oldYPosData2 = yPosSlice2.pop();
    // posYInput.value = oldYPosData2 ? oldYPosData2 : posYInput.value
    // oldZPosData2 = zPosSlice2.pop();
    // posZInput.value = oldZPosData2 ? oldZPosData2 : posZInput.value

    // saveXPosData2.push(oldXPosData2)
    // saveYPosData2.push(oldYPosData2)
    // saveZPosData2.push(oldZPosData2)
    // console.log(saveXPosData2,saveYPosData2,saveZPosData2)
  }
});

document.getElementById("redo").addEventListener("click", function(){
  if(transformControl.object == Group1){
    for(let i = inputs.length - 1; i >= 0; i --){
      newObjData1 = saveObjData1.pop();
      inputs[i].value = newObjData1? newObjData1 : inputs[i].value
    }
    console.log(newObjData1)
    // newXPosData1 = saveXPosData1.pop();
    // posXInput.value = newXPosData1 ? newXPosData1 : posXInput.value
    // newYPosData1 = saveYPosData1.pop();
    // posYInput.value = newYPosData1 ? newYPosData1 : posYInput.value
    // newZPosData1 = saveZPosData1.pop();
    // posZInput.value = newZPosData1 ? newZPosData1 : posZInput.value

    //console.log(newXPosData1,newYPosData1,newZPosData1)

  }else if(transformControl.object == Group2){
    for(let i = inputs.length - 1; i >= 0; i --){
      newObjData2 = saveObjData1.pop();
      inputs[i].value = newObjData2? newObjData2 : inputs[i].value
    }
    console.log(newObjData2)
    // newXPosData2 = saveXPosData2.pop();
    // posXInput.value = newXPosData2 ? newXPosData2 : posXInput.value
    // newYPosData2 = saveYPosData2.pop();
    // posYInput.value = newYPosData2 ? newYPosData2 : posYInput.value
    // newZPosData2 = saveZPosData2.pop();
    // posZInput.value = newZPosData2 ? newZPosData2 : posZInput.value

    // console.log(newXPosData2,newYPosData2,newZPosData2)
  }
})

// 클릭 되었을 때
function Group1Transform() {
  transformControl.addEventListener("change", function () {
    box1.setFromObject(Group1, Group1);
    box1.getSize(measure1);

    sizeXInput.value = (measure1.x * 100).toFixed(2).concat(" cm");
    sizeYInput.value = (measure1.y * 100).toFixed(2).concat(" cm");
    sizeZInput.value = (measure1.z * 100).toFixed(2).concat(" cm");

    Group1.getWorldPosition(worldPosition);
    posXInput.value = (worldPosition.x * 100).toFixed(2).concat(" cm");
    posYInput.value = (worldPosition.y * 100).toFixed(2).concat(" cm");
    posZInput.value = (worldPosition.z * 100).toFixed(2).concat(" cm");

    let group1X = THREE.MathUtils.radToDeg(Group1.rotation.x).toFixed(2).concat(" °");
    let group1Y = THREE.MathUtils.radToDeg(Group1.rotation.y).toFixed(2).concat(" °");
    let group1Z = THREE.MathUtils.radToDeg(Group1.rotation.z).toFixed(2).concat(" °");

    rotXInput.value = group1X;
    rotYInput.value = group1Y;
    rotZInput.value = group1Z;

    scaleXInput.value = Group1.scale.x.toFixed(2);
    scaleYInput.value = Group1.scale.y.toFixed(2);
    scaleZInput.value = Group1.scale.z.toFixed(2);
  });
}

function Group2Transform() {
  transformControl.addEventListener("change", function () {
    box2.setFromObject(Group2, Group2);
    box2.getSize(measure2);

    sizeXInput.value = (measure2.x * 100).toFixed(2).concat(" cm");
    sizeYInput.value = (measure2.y * 100).toFixed(2).concat(" cm");
    sizeZInput.value = (measure2.z * 100).toFixed(2).concat(" cm");

    Group2.getWorldPosition(worldPosition);
    posXInput.value = (worldPosition.x * 100).toFixed(2).concat(" cm");
    posYInput.value = (worldPosition.y * 100).toFixed(2).concat(" cm");
    posZInput.value = (worldPosition.z * 100).toFixed(2).concat(" cm");

    let group2X = THREE.MathUtils.radToDeg(Group2.rotation.x).toFixed(2).concat(" °");
    let group2Y = THREE.MathUtils.radToDeg(Group2.rotation.y).toFixed(2).concat(" °");
    let group2Z = THREE.MathUtils.radToDeg(Group2.rotation.z).toFixed(2).concat(" °");

    rotXInput.value = group2X;
    rotYInput.value = group2Y;
    rotZInput.value = group2Z;

    scaleXInput.value = Group2.scale.x.toFixed(2);
    scaleYInput.value = Group2.scale.y.toFixed(2);
    scaleZInput.value = Group2.scale.z.toFixed(2);
  });
}

function Group1UpdateTransform() {
  box1.setFromObject(Group1, Group1);
  box1.getSize(measure1);
  scene.add(helper1);

  Group1.position.x = parseFloat(posXInput.value) / 100 || Group1.position.x;
  Group1.position.y = parseFloat(posYInput.value) / 100 || Group1.position.y;
  Group1.position.z = parseFloat(posZInput.value) / 100 || Group1.position.z;

  if (posXInput.value == "0") {
    Group1.position.x = "0";
  }
  if (posYInput.value == "0") {
    Group1.position.y = "0";
  }
  if (posZInput.value == "0") {
    Group1.position.z = "0";
  }

  Group1.rotation.x = (parseFloat(rotXInput.value) * Math.PI) / 180 || Group1.rotation.x;
  Group1.rotation.y = (parseFloat(rotYInput.value) * Math.PI) / 180 || Group1.rotation.y;
  Group1.rotation.z = (parseFloat(rotZInput.value) * Math.PI) / 180 || Group1.rotation.z;

  if (rotXInput.value == "0") {
    Group1.rotation.x = "0";
  }
  if (rotYInput.value == "0") {
    Group1.rotation.y = "0";
  }
  if (rotZInput.value == "0") {
    Group1.rotation.z = "0";
  }

  Group1.scale.x = parseFloat(scaleXInput.value) || Group1.scale.x;
  Group1.scale.y = parseFloat(scaleYInput.value) || Group1.scale.y;
  Group1.scale.z = parseFloat(scaleZInput.value) || Group1.scale.z;
}

function Group2UpdateTransform() {
  box2.setFromObject(Group2, Group2);
  box2.getSize(measure2);
  scene.add(helper2);

  Group2.position.x = parseFloat(posXInput.value) / 100 || Group2.position.x;
  Group2.position.y = parseFloat(posYInput.value) / 100 || Group2.position.y;
  Group2.position.z = parseFloat(posZInput.value) / 100 || Group2.position.z;

  if (posXInput.value == "0") {
    Group2.position.x = "0";
  }
  if (posYInput.value == "0") {
    Group2.position.y = "0";
  }
  if (posZInput.value == "0") {
    Group2.position.z = "0";
  }

  Group2.rotation.x = (parseFloat(rotXInput.value) * Math.PI) / 180 || Group2.rotation.x;
  Group2.rotation.y = (parseFloat(rotYInput.value) * Math.PI) / 180 || Group2.rotation.y;
  Group2.rotation.z = (parseFloat(rotZInput.value) * Math.PI) / 180 || Group2.rotation.z;

  if (rotXInput.value == "0") {
    Group2.rotation.x = "0";
  }
  if (rotYInput.value == "0") {
    Group2.rotation.y = "0";
  }
  if (rotZInput.value == "0") {
    Group2.rotation.z = "0";
  }

  Group2.scale.x = parseFloat(scaleXInput.value) || Group2.scale.x;
  Group2.scale.y = parseFloat(scaleYInput.value) || Group2.scale.y;
  Group2.scale.z = parseFloat(scaleZInput.value) || Group2.scale.z;
}

function animate2() {
  if (transformControl.object == Group1) {
    Group1UpdateTransform();
  } else if (transformControl.object == Group2) {
    Group2UpdateTransform();
  }
  // if(newXObjData == undefined && newYObjData == undefined && newZObjData == undefined){
  //   document.getElementById("undo").disabled = true;
  // }else if(newXObjData != undefined || newYObjData != undefined || newZObjData != undefined){
  //   document.getElementById("undo").disabled = false;
  // }

  requestAnimationFrame(animate2);
}
animate2();

