import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
import GltfExporter from 'https://cdn.skypack.dev/three-gltf-exporter';
import { scene } from '../index.js'

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

// 의자 다리 변수 명
let leg1, leg2, leg3;

// 의자 시트 변수 명
let seat1, seat2, seat3, seat4;

let leg_type1 = loadModel("/chair/leg/tablechair_0101_leg.glb").then(result => { leg1 = result.scene; });
let leg_type2 = loadModel("/chair/leg/tablechair_0102_leg.glb").then(result => { leg2 = result.scene; });
let leg_type3 = loadModel("/chair/leg/tablechair_0103_leg.glb").then(result => { leg3 = result.scene; });

let seat_type1 = loadModel("/chair/seat/tablechair_0201_seat.glb").then(result => { seat1 = result.scene; });
let seat_type2 = loadModel("/chair/seat/tablechair_0202_seat.glb").then(result => { seat2 = result.scene; });
let seat_type3 = loadModel("/chair/seat/tablechair_0203_seat.glb").then(result => { seat3 = result.scene; });
let seat_type4 = loadModel("/chair/seat/tablechair_0204_seat.glb").then(result => { seat4 = result.scene; });

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
});

// 의자 다리 타입
document.getElementById("leg_type1").addEventListener("click", function () {
    leg1.visible = !leg1.visible;
    leg2.visible = false;
    leg3.visible = false;
});
document.getElementById("leg_type2").addEventListener("click", function () {
    leg2.visible = !leg2.visible;
    leg1.visible = false;
    leg3.visible = false;
});
document.getElementById("leg_type3").addEventListener("click", function () {
    leg3.visible = !leg3.visible;
    leg1.visible = false;
    leg2.visible = false;
});

// 의자 시트 타입
document.getElementById("seat_type1").addEventListener("click", function () {
     seat1.visible = ! seat1.visible;
     seat2.visible = false;
     seat3.visible = false;
     seat4.visible = false;
});
document.getElementById("seat_type2").addEventListener("click", function () {
     seat2.visible = !seat2.visible;
     seat1.visible = false;
     seat3.visible = false;
     seat4.visible = false;
});
document.getElementById("seat_type3").addEventListener("click", function () {
     seat3.visible = ! seat3.visible;
     seat1.visible = false;
     seat2.visible = false;
     seat4.visible = false;
});
document.getElementById("seat_type4").addEventListener("click", function () {
     seat4.visible = ! seat4.visible;
     seat1.visible = false;
     seat2.visible = false;
     seat3.visible = false;
});

