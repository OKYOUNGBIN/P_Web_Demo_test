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
import { TransformControls } from "/three/examples/jsm/controls/TransformControls.js";

function loadModelUsingPromise(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

let Group1 = new THREE.Group();
let Group2 = new THREE.Group();

Promise.all([
    loadModelUsingPromise("/cabinet/body/tvtable_0101_body.glb"),
    loadModelUsingPromise("/cabinet/body/tvtable_0101_body.glb"),
  ]).then((results) => {
    for (var j = 0; j < results.length; j++) {
      Group1.add(results[j].scenes[0]);
      Group1.children[j].visible = false;
    }  
  });
  scene.add(Group1);
  transformControl.attach(Group1);

Promise.all([
    loadModelUsingPromise("/cabinet/door/tvtable_0201_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0202_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0203_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0204_door.glb"),

    loadModelUsingPromise("/cabinet/door/tvtable_0301_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0302_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0303_door.glb"),
    loadModelUsingPromise("/cabinet/door/tvtable_0304_door.glb"),
  ]).then((results) => {
    for (var j = 0; j < results.length; j++) {
      Group2.add(results[j].scenes[0]);
      Group2.children[j].visible = false;
    }
    //transformControl.attach(Group2);
    //transformControl.detatch();
  });
  scene.add(Group2);

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

document.getElementById("body_type1").addEventListener("click", function () {
    Group1.children[0].visible = !Group1.children[0].visible;
    Group1.children[1].visible = false;   
});
document.getElementById("body_type2").addEventListener("click", function () {
    Group1.children[1].visible = !Group1.children[1].visible;
    Group1.children[0].visible = false;
    
});

document.getElementById("door_type1").addEventListener("click", function () {
    Group2.children[0].visible = !Group2.children[0].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type2").addEventListener("click", function () {
    Group2.children[1].visible = !Group2.children[1].visible;
    Group2.children[0].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type3").addEventListener("click", function () {
    Group2.children[2].visible = !Group2.children[2].visible;
    Group2.children[1].visible = false;
    Group2.children[0].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type4").addEventListener("click", function () {
    Group2.children[3].visible = !Group2.children[3].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[0].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type5").addEventListener("click", function () {
    Group2.children[4].visible = !Group2.children[4].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[0].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type6").addEventListener("click", function () {
    Group2.children[5].visible = !Group2.children[5].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[0].visible = false;
    Group2.children[6].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type7").addEventListener("click", function () {
    Group2.children[6].visible = !Group2.children[6].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[0].visible = false;
    Group2.children[7].visible = false;
});

document.getElementById("door_type7").addEventListener("click", function () {
    Group2.children[7].visible = !Group2.children[7].visible;
    Group2.children[1].visible = false;
    Group2.children[2].visible = false;
    Group2.children[3].visible = false;
    Group2.children[4].visible = false;
    Group2.children[5].visible = false;
    Group2.children[6].visible = false;
    Group2.children[0].visible = false;
});