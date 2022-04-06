import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
import GltfExporter from 'https://cdn.skypack.dev/three-gltf-exporter';
import { scene } from './index.js'

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

// 테이블 상판 변수 명
let circle1, circle2, circle3, circle4,
    rectangle1, rectangle2, rectangle3, rectangle4,
    semicircle1, semicircle2, semicircle3, semicircle4;

// 테이블 다리 변수 명
let leg1, leg2, leg3, leg4,
    leg5, leg6, leg7, leg8;

let semicircle_type1 = loadModel("/table/top/semicircle/diningtable_0201_top.glb").then(result => { semicircle1 = result.scene; });
let semicircle_type2 = loadModel("/table/top/semicircle/diningtable_0202_top.glb").then(result => { semicircle2 = result.scene; });
let semicircle_type3 = loadModel("/table/top/semicircle/diningtable_0203_top.glb").then(result => { semicircle3 = result.scene; });
let semicircle_type4 = loadModel("/table/top/semicircle/diningtable_0204_top.glb").then(result => { semicircle4 = result.scene; });

let rectangle_type1 = loadModel("/table/top/rectangle/diningtable_0205_top.glb").then(result => { rectangle1 = result.scene; });
let rectangle_type2 = loadModel("/table/top/rectangle/diningtable_0206_top.glb").then(result => { rectangle2 = result.scene; });
let rectangle_type3 = loadModel("/table/top/rectangle/diningtable_0207_top.glb").then(result => { rectangle3 = result.scene; });
let rectangle_type4 = loadModel("/table/top/rectangle/diningtable_0208_top.glb").then(result => { rectangle4 = result.scene; });

let circle_type1 = loadModel("/table/top/circle/diningtable_0209_top.glb").then(result => { circle1 = result.scene; });
let circle_type2 = loadModel("/table/top/circle/diningtable_0210_top.glb").then(result => { circle2 = result.scene; });
let circle_type3 = loadModel("/table/top/circle/diningtable_0211_top.glb").then(result => { circle3 = result.scene; });
let circle_type4 = loadModel("/table/top/circle/diningtable_0212_top.glb").then(result => { circle4 = result.scene; });

let leg_type1 = loadModel("/table/leg/type1/diningtable_0101_leg.glb").then(result => { leg1 = result.scene; });
let leg_type2 = loadModel("/table/leg/type1/diningtable_0102_leg.glb").then(result => { leg2 = result.scene; });
let leg_type3 = loadModel("/table/leg/type1/diningtable_0103_leg.glb").then(result => { leg3 = result.scene; });
let leg_type4 = loadModel("/table/leg/type1/diningtable_0104_leg.glb").then(result => { leg4 = result.scene; });

let leg_type5 = loadModel("/table/leg/type2/diningtable_0101_leg_rectagle.glb").then(result => { leg5 = result.scene; });
let leg_type6 = loadModel("/table/leg/type2/diningtable_0102_leg_rectagle.glb").then(result => { leg6 = result.scene; });
let leg_type7 = loadModel("/table/leg/type2/diningtable_0103_leg_rectagle.glb").then(result => { leg7 = result.scene; });
let leg_type8 = loadModel("/table/leg/type2/diningtable_0104_leg_rectagle.glb").then(result => { leg8 = result.scene; });

Promise.all([semicircle_type1, semicircle_type2, semicircle_type3, semicircle_type4,
    rectangle_type1, rectangle_type2, rectangle_type3, rectangle_type4,
    circle_type1, circle_type2, circle_type3, circle_type4,
    leg_type1, leg_type2, leg_type3, leg_type4,
    leg_type5, leg_type6, leg_type7, leg_type8]).then(() => {

        semicircle1.visible = false;
        semicircle2.visible = false;
        semicircle3.visible = false;
        semicircle4.visible = false;

        rectangle1.visible = false;
        rectangle2.visible = false;
        rectangle3.visible = false;
        rectangle4.visible = false;

        circle1.visible = false;
        circle2.visible = false;
        circle3.visible = false;
        circle4.visible = false;

        leg1.visible = false;
        leg2.visible = false;
        leg3.visible = false;
        leg4.visible = false;
        
        leg5.visible = false;
        leg6.visible = false;
        leg7.visible = false;
        leg8.visible = false;

        scene.add(semicircle1, semicircle2, semicircle3, semicircle4);

        scene.add(rectangle1, rectangle2, rectangle3, rectangle4);

        scene.add(circle1, circle2, circle3, circle4);

        scene.add(leg1, leg2, leg3, leg4);
        
        scene.add(leg5, leg6, leg7, leg8);
    });

// ============================ 테이블 상판 반원 타입 ============================
document.getElementById("semicircle_type1").addEventListener("click", function () {
    semicircle1.visible = !semicircle1.visible;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
});
document.getElementById("semicircle_type2").addEventListener("click", function () {
    semicircle2.visible = !semicircle2.visible;
    semicircle1.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
});
document.getElementById("semicircle_type3").addEventListener("click", function () {
    semicircle3.visible = !semicircle3.visible;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
});
document.getElementById("semicircle_type4").addEventListener("click", function () {
    semicircle4.visible = !semicircle4.visible;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
});

// ============================ 테이블 상판 직사각형 타입 ============================
document.getElementById("rectangle_type1").addEventListener("click", function () {
    rectangle1.visible = !rectangle1.visible;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});
document.getElementById("rectangle_type2").addEventListener("click", function () {
    rectangle2.visible = !rectangle2.visible;
    rectangle1.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});
document.getElementById("rectangle_type3").addEventListener("click", function () {
    rectangle3.visible = !rectangle3.visible;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle4.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
});
document.getElementById("rectangle_type4").addEventListener("click", function () {
    rectangle4.visible = !rectangle4.visible;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});

// ============================ 테이블 상판 원형 타입 ============================
document.getElementById("circle_type1").addEventListener("click", function () {
    circle1.visible = !circle1.visible;
    circle2.visible = false;
    circle3.visible = false;
    circle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});
document.getElementById("circle_type2").addEventListener("click", function () {
    circle2.visible = !circle2.visible;
    circle1.visible = false;
    circle3.visible = false;
    circle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});
document.getElementById("circle_type3").addEventListener("click", function () {
    circle3.visible = !circle3.visible;
    circle1.visible = false;
    circle2.visible = false;
    circle4.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});
document.getElementById("circle_type4").addEventListener("click", function () {
    circle4.visible = !circle4.visible;
    circle1.visible = false;
    circle2.visible = false;
    circle3.visible = false;
    rectangle1.visible = false;
    rectangle2.visible = false;
    rectangle3.visible = false;
    rectangle4.visible = false;
    semicircle1.visible = false;
    semicircle2.visible = false;
    semicircle3.visible = false;
    semicircle4.visible = false;
});

// ============================ 테이블 다리 타입1 ============================
document.getElementById("table_leg_type1").addEventListener("click", function () {
    leg1.visible = !leg1.visible;
    leg2.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type2").addEventListener("click", function () {
    leg2.visible = !leg2.visible;
    leg1.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type3").addEventListener("click", function () {
    leg3.visible = !leg3.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type4").addEventListener("click", function () {
    leg4.visible = !leg4.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});

// ============================ 테이블 다리 타입2 ============================
document.getElementById("table_leg_type5").addEventListener("click", function () {
    leg5.visible = !leg5.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg6.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type6").addEventListener("click", function () {
    leg6.visible = !leg6.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg7.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type7").addEventListener("click", function () {
    leg7.visible = !leg7.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg8.visible = false;
});
document.getElementById("table_leg_type8").addEventListener("click", function () {
    leg8.visible = !leg8.visible;
    leg1.visible = false;
    leg2.visible = false;
    leg3.visible = false;
    leg4.visible = false;
    leg5.visible = false;
    leg6.visible = false;
    leg7.visible = false;
});