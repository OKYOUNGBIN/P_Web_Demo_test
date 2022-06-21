<<<<<<< HEAD
import * as THREE from "/three/build/three.module.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "/three/examples/jsm/exporters/GLTFExporter.js";
import {
  scene,
  camera,
  renderer,
  oribitControls,
  transformControl,
} from "/index.js";
import { DragControls } from "/three/examples/jsm/controls/DragControls.js";
=======
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from '../index.js'
>>>>>>> 2e2ade04e6851dbf1b95b1a0d76cba6a2d63bd1a

function loadModelUsingPromise(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}
let Group1 = new THREE.Group();
let Group2 = new THREE.Group();

<<<<<<< HEAD
Promise.all([
  loadModelUsingPromise("/chair/leg/tablechair_0101_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0102_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0103_leg.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group1.add(results[j].scenes[0]);
    Group1.children[j].visible = false;
  }  
=======
// 의자 다리 변수 명
let leg1, leg2, leg3;

// 의자 시트 변수 명
let seat1, seat2, seat3, seat4;

let leg_type1 = loadModel("../../models/chair/leg/tablechair_0101_leg.glb").then(result => { leg1 = result.scene; });
let leg_type2 = loadModel("../../models/chair/leg/tablechair_0102_leg.glb").then(result => { leg2 = result.scene; });
let leg_type3 = loadModel("../../models/chair/leg/tablechair_0103_leg.glb").then(result => { leg3 = result.scene; });

let seat_type1 = loadModel("../../models/chair/seat/tablechair_0201_seat.glb").then(result => { seat1 = result.scene; });
let seat_type2 = loadModel("../../models/chair/seat/tablechair_0202_seat.glb").then(result => { seat2 = result.scene; });
let seat_type3 = loadModel("../../models/chair/seat/tablechair_0203_seat.glb").then(result => { seat3 = result.scene; });
let seat_type4 = loadModel("../../models/chair/seat/tablechair_0204_seat.glb").then(result => { seat4 = result.scene; });

Promise.all([leg_type1, leg_type2, leg_type3, seat_type1, seat_type2, seat_type3, seat_type4]).then(() => {
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    
    seat1.visible = false;
    seat2.visible = false;
    seat3.visible = false;
    seat4.visible = false;
    
    scene.add(leg1, leg2, leg3);
    
    scene.add(seat1, seat2, seat3, seat4);
>>>>>>> 2e2ade04e6851dbf1b95b1a0d76cba6a2d63bd1a
});
scene.add(Group1);
transformControl.attach(Group1);

Promise.all([
  loadModelUsingPromise("/chair/seat/tablechair_0201_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0202_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0203_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0204_seat.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group2.add(results[j].scenes[0]);
    Group2.children[j].visible = false;
  }
  //transformControl.attach(Group2);
  //transformControl.detatch();
});
scene.add(Group2);

let dragControls = new DragControls(Group2, camera, renderer.domElement) //
dragControls.addEventListener('hoveron', function (event) {
  scene.add(transformControl)
  transformControl.attach(event.object)
  cancelHideTransform()
})
dragControls.addEventListener('hoveroff', function () {
  delayHideTransform()
})

let objects = [Group1 ,Group2]

const { tempUrl } = await fetch("/s3UrlTemp").then((res) => res.json()); // 원본 glb s3 bucket
//다운로드 버튼 생성 후 이벤트 추가
const btn = document.querySelector(".download-glb");
btn.addEventListener("click", uploadTempS3);
//gltfExporter을 이용해 생성된 버튼
function uploadTempS3(event) {
  event.preventDefault();
  window.scrollTo({
    top: 2928,
    left: 1945,
    behavior: "smooth",
  });
  
  const exporter = new GLTFExporter();
  // 배열에 여러가지 gltf변수 넣기[]
  exporter.parse(
    [objects[0], objects[1]],
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

// 의자 다리 타입
document.getElementById("leg_type1").addEventListener("click", function () {
  Group1.children[0].visible = !Group1.children[0].visible;
  Group1.children[1].visible = false;
  Group1.children[2].visible = false;
});

document.getElementById("leg_type2").addEventListener("click", function () {
  Group1.children[1].visible = !Group1.children[1].visible;
  Group1.children[0].visible = false;
  Group1.children[2].visible = false;
});
document.getElementById("leg_type3").addEventListener("click", function () {
  Group1.children[2].visible = !Group1.children[1].visible;
  Group1.children[0].visible = false;
  Group1.children[1].visible = false;
});

// 의자 시트 타입
document.getElementById("seat_type1").addEventListener("click", function () {
  Group2.children[0].visible = !Group2.children[0].visible;
  Group2.children[1].visible = false;
  Group2.children[2].visible = false;
  Group2.children[3].visible = false;
});
document.getElementById("seat_type2").addEventListener("click", function () {
  Group2.children[1].visible = !Group2.children[1].visible;
  Group2.children[0].visible = false;
  Group2.children[2].visible = false;
  Group2.children[3].visible = false;
});
document.getElementById("seat_type3").addEventListener("click", function () {
  Group2.children[2].visible = !Group2.children[2].visible;
  Group2.children[1].visible = false;
  Group2.children[0].visible = false;
  Group2.children[3].visible = false;
});
document.getElementById("seat_type4").addEventListener("click", function () {
  Group2.children[3].visible = !Group2.children[3].visible;
  Group2.children[1].visible = false;
  Group2.children[2].visible = false;
  Group2.children[0].visible = false;
});
