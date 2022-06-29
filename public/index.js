import * as THREE from "/three/build/three.module.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "/three/examples/jsm/controls/TransformControls.js";

let scene,
  camera,
  canvas,
  renderer,
  oribitControls,
  gridHelper,
  transformControl,
  raycaster,
  pointer;

const tabHideShow = document.getElementById("tabHideShow");
const tabContent = document.getElementById("bottom_content");
tabHideShow.addEventListener("click", contentHideShow);
function contentHideShow() {
  if (tabContent.style.display == "block") {
    tabContent.style.display = "none";
  } else {
    tabContent.style.display = "block";
  }
}

const tabs = document.querySelectorAll("[data-tab-target]");
const tabcon = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabcon.forEach((tabc_all) => {
      tabc_all.classList.remove("active");
    });
    target.classList.add("active");
  });
});

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 1cm -> 0.01m 1m -> 100칸으로 나눔 -> 1cm
gridHelper = new THREE.GridHelper(10, 100);
scene.add(gridHelper);

canvas = document.querySelector("#c");
renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.prepend(renderer.domElement);

transformControl = new TransformControls(camera, renderer.domElement);
scene.add(transformControl);

transformControl.addEventListener("dragging-changed", function (event) {
  oribitControls.enabled = !event.value;
});

raycaster = new THREE.Raycaster();
pointer = new THREE.Vector2();

window.addEventListener("keydown", function (event) {
  switch (event.key || event.keyCode) {
    case "w":
      transformControl.setMode("translate");
      break;
    case "e":
      transformControl.setMode("rotate");
      break;
    case "r":
      transformControl.setMode("scale");
      break;
  }
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

setTimeout(function () {
  document.querySelector(".modal").style.display = "none";
}, 1500);

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene
scene.add(dirLight);

oribitControls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 1);
oribitControls.update();

function resizeRendererToDisplaySize(renderer) {
  canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  renderer.render( scene, camera );
}

function animate() {
  renderer.render( scene, camera );
  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateWorldMatrix();
  }
}

animate();

export { scene, camera, renderer, oribitControls, transformControl , gridHelper, raycaster, pointer, render};
