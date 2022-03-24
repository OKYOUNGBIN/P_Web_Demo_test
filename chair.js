import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
import { scene } from './index.js'
function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

// 의자 다리 변수 명
let tablechair_0101_leg, tablechair_0102_leg, tablechair_0103_leg;
// 의자 시트 변수 명
let tablechair_0201_seat, tablechair_0202_seat, tablechair_0203_seat, tablechair_0204_seat;

let leg_type1 = loadModel("./models/chair/leg/tablechair_0101_leg.glb").then(result => { tablechair_0101_leg = result.scene; });
let leg_type2 = loadModel("./models/chair/leg/tablechair_0102_leg.glb").then(result => { tablechair_0102_leg = result.scene; });
let leg_type3 = loadModel("./models/chair/leg/tablechair_0103_leg.glb").then(result => { tablechair_0103_leg = result.scene; });

let seat_type1 = loadModel("./models/chair/seat/tablechair_0201_seat.glb").then(result => { tablechair_0201_seat = result.scene; });
let seat_type2 = loadModel("./models/chair/seat/tablechair_0202_seat.glb").then(result => { tablechair_0202_seat = result.scene; });
let seat_type3 = loadModel("./models/chair/seat/tablechair_0203_seat.glb").then(result => { tablechair_0203_seat = result.scene; });
let seat_type4 = loadModel("./models/chair/seat/tablechair_0204_seat.glb").then(result => { tablechair_0204_seat = result.scene; });

Promise.all([leg_type1, leg_type2, leg_type3, seat_type1, seat_type2, seat_type3, seat_type4]).then(() => {

    tablechair_0101_leg.visible = false;
    tablechair_0102_leg.visible = false;
    tablechair_0103_leg.visible = false;

    tablechair_0201_seat.visible = false;
    tablechair_0202_seat.visible = false;
    tablechair_0203_seat.visible = false;
    tablechair_0204_seat.visible = false;

    scene.add(tablechair_0101_leg);
    scene.add(tablechair_0102_leg);
    scene.add(tablechair_0103_leg);

    scene.add(tablechair_0201_seat);
    scene.add(tablechair_0202_seat);
    scene.add(tablechair_0203_seat);
    scene.add(tablechair_0204_seat);
});

// 의자 다리 타입
document.getElementById("leg_type1").addEventListener("click", function () {
    tablechair_0101_leg.visible = !tablechair_0101_leg.visible;
    tablechair_0102_leg.visible = false;
    tablechair_0103_leg.visible = false;
});
document.getElementById("leg_type2").addEventListener("click", function () {
    tablechair_0102_leg.visible = !tablechair_0102_leg.visible;
    tablechair_0101_leg.visible = false;
    tablechair_0103_leg.visible = false;
}); 
document.getElementById("leg_type3").addEventListener("click", function () {
    tablechair_0103_leg.visible = !tablechair_0103_leg.visible;
    tablechair_0101_leg.visible = false;
    tablechair_0102_leg.visible = false;
}); 

// 의자 시트 타입
document.getElementById("seat_type1").addEventListener("click", function () {
    tablechair_0201_seat.visible = !tablechair_0201_seat.visible;
    tablechair_0202_seat.visible = false;
    tablechair_0203_seat.visible = false;
    tablechair_0204_seat.visible = false;
});
document.getElementById("seat_type2").addEventListener("click", function () {
    tablechair_0202_seat.visible = !tablechair_0202_seat.visible;
    tablechair_0201_seat.visible = false;
    tablechair_0203_seat.visible = false;
    tablechair_0204_seat.visible = false;
});
document.getElementById("seat_type3").addEventListener("click", function () {
    tablechair_0203_seat.visible = !tablechair_0203_seat.visible;
    tablechair_0201_seat.visible = false;
    tablechair_0202_seat.visible = false;
    tablechair_0204_seat.visible = false;
});
document.getElementById("seat_type4").addEventListener("click", function () {
    tablechair_0204_seat.visible = !tablechair_0204_seat.visible;
    tablechair_0201_seat.visible = false;
    tablechair_0202_seat.visible = false;
    tablechair_0203_seat.visible = false;
});