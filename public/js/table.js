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

Promise.all([
  loadModelUsingPromise("/table/top/semicircle/diningtable_0201_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0202_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0203_top.glb"),
  loadModelUsingPromise("/table/top/semicircle/diningtable_0204_top.glb"),

  loadModelUsingPromise("/table/top/rectangle/diningtable_0205_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0206_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0207_top.glb"),
  loadModelUsingPromise("/table/top/rectangle/diningtable_0208_top.glb"),

  loadModelUsingPromise("/table/top/circle/diningtable_0209_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0210_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0211_top.glb"),
  loadModelUsingPromise("/table/top/circle/diningtable_0212_top.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group1.add(results[j].scenes[0]);
    Group1.children[j].visible = false;
    Group1.children[j].scale.set(0,0,0)
  }
});


Promise.all([
  loadModelUsingPromise("/table/leg/type1/diningtable_0101_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0102_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0103_leg.glb"),
  loadModelUsingPromise("/table/leg/type1/diningtable_0104_leg.glb"),

  loadModelUsingPromise("/table/leg/type2/diningtable_0101_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0102_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0103_leg_rectagle.glb"),
  loadModelUsingPromise("/table/leg/type2/diningtable_0104_leg_rectagle.glb"),
]).then((results) => {
  for (var j = 0; j < results.length; j++) {
    Group2.add(results[j].scenes[0]);
    Group2.children[j].visible = false;
    Group2.children[j].scale.set(0,0,0)
  }
});
scene.add(Group1,Group2);

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
    [Group1, Group2],
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
var without1 = Group1.children;
var without2 = Group2.children;
// ============================ 테이블 상판 반원 타입 ============================
document
  .getElementById("semicircle_type1")
  .addEventListener("click", function () {
    without1[0].visible = !without1[0].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });

document
  .getElementById("semicircle_type2")
  .addEventListener("click", function () {
    without1[1].visible = !without1[1].visible;
    without1[0].visible = false;
    without1[2].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });
document
  .getElementById("semicircle_type3")
  .addEventListener("click", function () {
    without1[2].visible = !without1[2].visible;
    without1[1].visible = false;
    without1[0].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });

document
  .getElementById("semicircle_type4")
  .addEventListener("click", function () {
    without1[3].visible = !without1[3].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[0].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });

// ============================ 테이블 상판 직사각형 타입 ============================
document
  .getElementById("rectangle_type1")
  .addEventListener("click", function () {
    without1[4].visible = !without1[4].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[0].visible = false;
    without1[3].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });
document
  .getElementById("rectangle_type2")
  .addEventListener("click", function () {
    without1[5].visible = !without1[5].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[0].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[6].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });
document
  .getElementById("rectangle_type3")
  .addEventListener("click", function () {
    without1[6].visible = !without1[6].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[0].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[7].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });

document
  .getElementById("rectangle_type4")
  .addEventListener("click", function () {
    without1[7].visible = !without1[7].visible;
    without1[1].visible = false;
    without1[2].visible = false;
    without1[0].visible = false;
    without1[3].visible = false;
    without1[4].visible = false;
    without1[5].visible = false;
    without1[6].visible = false;
    without1[8].visible = false;
    without1[9].visible = false;
    without1[10].visible = false;
    without1[11].visible = false;
  });

// ============================ 테이블 상판 원형 타입 ============================
document.getElementById("circle_type1").addEventListener("click", function () {
  without1[8].visible = !without1[8].visible;
  without1[1].visible = false;
  without1[2].visible = false;
  without1[0].visible = false;
  without1[3].visible = false;
  without1[4].visible = false;
  without1[5].visible = false;
  without1[6].visible = false;
  without1[7].visible = false;
  without1[9].visible = false;
  without1[10].visible = false;
  without1[11].visible = false;
});

document.getElementById("circle_type2").addEventListener("click", function () {
  without1[9].visible = !without1[9].visible;
  without1[1].visible = false;
  without1[2].visible = false;
  without1[0].visible = false;
  without1[3].visible = false;
  without1[4].visible = false;
  without1[5].visible = false;
  without1[6].visible = false;
  without1[7].visible = false;
  without1[8].visible = false;
  without1[10].visible = false;
  without1[11].visible = false;
});

document.getElementById("circle_type3").addEventListener("click", function () {
  without1[10].visible = !without1[10].visible;
  without1[1].visible = false;
  without1[2].visible = false;
  without1[0].visible = false;
  without1[3].visible = false;
  without1[4].visible = false;
  without1[5].visible = false;
  without1[6].visible = false;
  without1[7].visible = false;
  without1[8].visible = false;
  without1[9].visible = false;
  without1[11].visible = false;
});

document.getElementById("circle_type4").addEventListener("click", function () {
  without1[11].visible = !without1[11].visible;
  without1[1].visible = false;
  without1[2].visible = false;
  without1[0].visible = false;
  without1[3].visible = false;
  without1[4].visible = false;
  without1[5].visible = false;
  without1[6].visible = false;
  without1[7].visible = false;
  without1[8].visible = false;
  without1[9].visible = false;
  without1[10].visible = false;
});

// ============================ 테이블 다리 타입1 ============================
document
  .getElementById("table_leg_type1")
  .addEventListener("click", function () {
    without2[0].visible = !without2[0].visible;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type2")
  .addEventListener("click", function () {
    without2[1].visible = !without2[1].visible;
    without2[0].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type3")
  .addEventListener("click", function () {
    without2[2].visible = !without2[2].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type4")
  .addEventListener("click", function () {
    without2[3].visible = !without2[3].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });

// ============================ 테이블 다리 타입2 ============================
document
  .getElementById("table_leg_type5")
  .addEventListener("click", function () {
    without2[4].visible = !without2[4].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type6")
  .addEventListener("click", function () {
    without2[5].visible = !without2[5].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[6].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type7")
  .addEventListener("click", function () {
    without2[6].visible = !without2[6].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[7].visible = false;
  });
document
  .getElementById("table_leg_type8")
  .addEventListener("click", function () {
    without2[7].visible = !without2[7].visible;
    without2[0].visible = false;
    without2[1].visible = false;
    without2[2].visible = false;
    without2[3].visible = false;
    without2[4].visible = false;
    without2[5].visible = false;
    without2[6].visible = false;
  });
