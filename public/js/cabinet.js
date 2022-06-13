import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from '../index.js'

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

// 캐비닛 문
let door1, door2, door3, door4, door5, door6, door7, door8;
let body1, body2

let door_type1 = loadModel("../../models/cabinet/door/tvtable_0201_door.glb").then(result => { door1 = result.scene; });
let door_type2 = loadModel("../../models/cabinet/door/tvtable_0202_door.glb").then(result => { door2 = result.scene; });
let door_type3 = loadModel("../../models/cabinet/door/tvtable_0203_door.glb").then(result => { door3 = result.scene; });
let door_type4 = loadModel("../../models/cabinet/door/tvtable_0204_door.glb").then(result => { door4 = result.scene; });
let door_type5 = loadModel("../../models/cabinet/door/tvtable_0301_door.glb").then(result => { door5 = result.scene; });
let door_type6 = loadModel("../../models/cabinet/door/tvtable_0302_door.glb").then(result => { door6 = result.scene; });
let door_type7 = loadModel("../../models/cabinet/door/tvtable_0303_door.glb").then(result => { door7 = result.scene; });
let door_type8 = loadModel("../../models/cabinet/door/tvtable_0304_door.glb").then(result => { door8 = result.scene; });

let body_type1 = loadModel("../../models/cabinet/body/tvtable_0101_body.glb").then(result => { body1 = result.scene; });
let body_type2 = loadModel("../../models/cabinet/body/tvtable_0201_body.glb").then(result => { body2 = result.scene; });

Promise.all([door_type1, door_type2, door_type3, door_type4,door_type5,door_type6,door_type7, door_type8,
    body_type1, body_type2]).then(() => {

    door1.visible = false;
    door2.visible = false;
    door3.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;

    body1.visible = false;
    body2.visible = false;

    scene.add(door1, door2, door3,door4, door5, door6, door7, door8);

    scene.add(body1, body2);
});
// 의자 다리 타입
document.getElementById("door_type1").addEventListener("click", function () {
    door1.visible = !door1.visible;
    door2.visible = false;
    door3.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type2").addEventListener("click", function () {
    door2.visible = !door2.visible;
    door1.visible = false;
    door3.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type3").addEventListener("click", function () {
    door3.visible = !door3.visible;
    door1.visible = false;
    door2.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type4").addEventListener("click", function () {
    door4.visible = !door4.visible;
    door1.visible = false;
    door2.visible = false;
    door3.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type5").addEventListener("click", function () {
    door5.visible = !door5.visible;
    door1.visible = false;
    door2.visible = false;
    door3.visible = false;
    door4.visible = false;
    door6.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type6").addEventListener("click", function () {
    door6.visible = !door6.visible;
    door1.visible = false;
    door2.visible = false;
    door3.visible = false;
    door4.visible = false;
    door5.visible = false;
    door7.visible = false;
    door8.visible = false;
});
document.getElementById("door_type7").addEventListener("click", function () {
    door7.visible = !door7.visible;
    door1.visible = false;
    door2.visible = false;
    door3.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door8.visible = false;
});
document.getElementById("door_type8").addEventListener("click", function () {
    door8.visible = !door8.visible;
    door1.visible = false;
    door3.visible = false;
    door2.visible = false;
    door4.visible = false;
    door5.visible = false;
    door6.visible = false;
    door7.visible = false;
});

document.getElementById("body_type1").addEventListener("click", function () {
    body1.visible = !body1.visible;
    body2.visible = false;
});
document.getElementById("body_type2").addEventListener("click", function () {
    body2.visible = !body2.visible;
    body1.visible = false;
});