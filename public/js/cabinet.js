import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
import GltfExporter from 'https://cdn.skypack.dev/three-gltf-exporter';
import { scene } from '../index.js'

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

// 캐비닛 문
let door1, door2, door3;
let body1

let door_type1 = loadModel("/cabinet/tvtable_0201_door.glb").then(result => { door1 = result.scene; });
let door_type2 = loadModel("/cabinet/tvtable_0202_door.glb").then(result => { door2 = result.scene; });
let door_type3 = loadModel("/cabinet/tvtable_0203_door.glb").then(result => { door3 = result.scene; });

let body_type1 = loadModel("/cabinet/tvtable_0101_body.glb").then(result => { body1 = result.scene; });

Promise.all([door_type1, door_type2, door_type3, body_type1]).then(() => {
    door1.visible = false;
    door2.visible = false;
    door3.visible = false;

    body1.visible = false;

    scene.add(door1, door2, door3);

    scene.add(body1);
});
// 의자 다리 타입
document.getElementById("door_type1").addEventListener("click", function () {
    door1.visible = !door1.visible;
    door2.visible = false;
    door3.visible = false;
});
document.getElementById("door_type2").addEventListener("click", function () {
    door2.visible = !door2.visible;
    door1.visible = false;
    door3.visible = false;
});
document.getElementById("door_type3").addEventListener("click", function () {
    door3.visible = !door3.visible;
    door1.visible = false;
    door2.visible = false;
});

document.getElementById("body_type1").addEventListener("click", function () {
    body1.visible = !body1.visible;
});