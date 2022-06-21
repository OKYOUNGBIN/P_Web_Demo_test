import * as THREE from "/three/build/three.module.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";
import { scene, camera, renderer } from "/index.js";
import { TransformControls } from "/three/examples/jsm/controls/TransformControls.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";

const manager = new THREE.LoadingManager();

const tabHideShow = document.getElementById("tabHideShow")
const tabContent = document.getElementById("content")
tabHideShow.addEventListener("click", contentHideShow)
function contentHideShow(){
  if(tabContent.style.display == 'block') {
    tabContent.style.display = 'none';
  }else{
    tabContent.style.display = 'block';
  }
}

function loadModelUsingPromise(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}
const chairGroup = new THREE.Group();
const tableGroup = new THREE.Group();
const cabinetGroup = new THREE.Group();

let results = [];

const chairLoad = Promise.all([
  loadModelUsingPromise("/chair/seat/tablechair_0201_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0202_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0203_seat.glb"),
  loadModelUsingPromise("/chair/seat/tablechair_0204_seat.glb"),

  loadModelUsingPromise("/chair/leg/tablechair_0101_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0102_leg.glb"),
  loadModelUsingPromise("/chair/leg/tablechair_0103_leg.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    chairGroup.add(results[j].scenes[0]);
  }
  console.log(results);
  chairGroup.visible = false;
  scene.add(chairGroup);
});

const tableLoad = Promise.all([
  loadModelUsingPromise("/table/leg/type1/diningtable_0101_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0102_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0103_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0104_leg.glb"),

  loadModelUsingPromise("/table/leg/type2/diningtable_0101_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0102_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0103_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0104_leg_rectagle.glb"),

  loadModelUsingPromise("/table/top/circle/diningtable_0209_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0210_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0211_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0212_top.glb"),

  loadModelUsingPromise("/table/top/rectangle/diningtable_0205_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0206_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0207_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0208_top.glb"),

  loadModelUsingPromise("/table/top/semicircle/diningtable_0201_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0202_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0203_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0204_top.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    tableGroup.add(results[j].scenes[0]);
  }
  console.log(results);
  tableGroup.visible = false;
  scene.add(tableGroup);
});
const cabinetLoad = Promise.all([
  loadModelUsingPromise("/cabinet/door/tvtable_0201_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0202_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0203_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0204_door.glb"),

  loadModelUsingPromise("/cabinet/door/tvtable_0301_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0302_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0303_door.glb"),
  loadModelUsingPromise("/cabinet/door/tvtable_0304_door.glb"),

  loadModelUsingPromise("/cabinet/body/tvtable_0101_body.glb"),
  loadModelUsingPromise("/cabinet/body/tvtable_0201_body.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    cabinetGroup.add(results[j].scenes[0]);
  }
  console.log(results);
  cabinetGroup.visible = false;
  scene.add(cabinetGroup);
});

const tabs = document.querySelectorAll("[data-tab-target]");
const tabcon = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabcon.forEach((tabc_all) => {
      tabc_all.classList.remove("active");

      //탭 클릭시 다 사라지게 하기 오브젝트
      //tableGroup.visible = false;
      //cabinetGroup.visible = false;
      //chairGroup.visible = false;
    });
    target.classList.add("active");
  });
});
console.log(chairGroup)
console.log(tableGroup)

document.getElementById("semicircle_type1").addEventListener("click", function () {
  chairGroup.isGroup = ! chairGroup.isGroup;
  
  console.log("그룹", chairGroup.isGroup)
  chairGroup.visible = ! chairGroup.visible;
  tableGroup.visible = false;
  cabinetGroup.visible = false;
});

// rest 써보기

//children[0].visible
// document.getElementById('').addEventListener("click", function () {
//     cabinetGroup.visible = false;
//     chairGroup.visible = false;
// });

// document.getElementById('').addEventListener("click", function () {
//     tableGroup.visible = false;
//     chairGroup.visible = false;
// });
