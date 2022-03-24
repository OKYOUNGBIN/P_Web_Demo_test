import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2'
import { scene } from './index.js'
function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}


// 선반 테두리
let bot1, bot2, bot3, top1, top2, top3;
// 파이프
let pipe1, pipe2, pipe3, pipe4, pipe5, pipe6, pipe7, pipe8, pipe9, pipe10, pipe11, pipe12, pipe13, pipe14, pipe15, pipe16, pipe17, pipe18;

let bot_frame_size1 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w600_d400.glb").then(result => { bot1 = result.scene; });
let bot_frame_size2 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w800_d400.glb").then(result => { bot2 = result.scene; });
let bot_frame_size3 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w1200_d400.glb").then(result => { bot3 = result.scene; });

let top_frame_size1 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w600_d400.glb").then(result => { top1 = result.scene; });
let top_frame_size2 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w600_d400.glb").then(result => { top2 = result.scene; });
let top_frame_size3 = loadModel("./models/shelf/botFrame/bottom_frame_0201_w600_d400.glb").then(result => { top3 = result.scene; });

let pipe_size1 = loadModel("./models/shelf/pipe/shelf_0301_t50_h600_w600.glb").then(result => { pipe1 = result.scene; });
let pipe_size2 = loadModel("./models/shelf/pipe/shelf_0301_t50_h600_w800.glb").then(result => { pipe2 = result.scene; });
let pipe_size3 = loadModel("./models/shelf/pipe/shelf_0301_t50_h600_w1200.glb").then(result => { pipe3 = result.scene; });
let pipe_size4 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1200_w600.glb").then(result => { pipe4 = result.scene; });
let pipe_size5 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1200_w800.glb").then(result => { pipe5 = result.scene; });
let pipe_size6 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1200_w1200.glb").then(result => { pipe6 = result.scene; });
let pipe_size7 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1500_w600.glb").then(result => { pipe7 = result.scene; });
let pipe_size8 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1500_w800.glb").then(result => { pipe8 = result.scene; });
let pipe_size9 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1500_w1200.glb").then(result => { pipe9 = result.scene; });
let pipe_size10 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1800_w600.glb").then(result => { pipe10 = result.scene; });
let pipe_size11 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1800_w800.glb").then(result => { pipe11 = result.scene; });
let pipe_size12 = loadModel("./models/shelf/pipe/shelf_0301_t50_h1800_w1200.glb").then(result => { pipe12 = result.scene; });
let pipe_size13 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2100_w600.glb").then(result => { pipe13 = result.scene; });
let pipe_size14 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2100_w800.glb").then(result => { pipe14 = result.scene; });
let pipe_size15 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2100_w1200.glb").then(result => { pipe15 = result.scene; });
let pipe_size16 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2400_w600.glb").then(result => { pipe16 = result.scene; });
let pipe_size17 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2400_w800.glb").then(result => { pipe17 = result.scene; });
let pipe_size18 = loadModel("./models/shelf/pipe/shelf_0301_t50_h2400_w1200.glb").then(result => { pipe18 = result.scene; });

Promise.all(
    [bot_frame_size1, bot_frame_size2, bot_frame_size3, top_frame_size1, top_frame_size2, top_frame_size3,
        pipe_size1, pipe_size2, pipe_size3, pipe_size4, pipe_size5, pipe_size6, pipe_size7, pipe_size8, pipe_size9, pipe_size10, pipe_size11, pipe_size12,
        pipe_size13, pipe_size14, pipe_size15, pipe_size16, pipe_size17, pipe_size18]).then(() => {

            bot1.visible = false;
            bot2.visible = false;
            bot3.visible = false;

            top1.visible = false;
            top2.visible = false;
            top3.visible = false;
            
            scene.add(bot1);
            scene.add(bot2);
            scene.add(bot3);

            scene.add(top1);
            scene.add(top2);
            scene.add(top3);
        });

// 의자 다리 타입
document.getElementById("bot_type1").addEventListener("click", function () {
    bot1.visible = true;
});
document.getElementById("bot_type2").addEventListener("click", function () {

});
document.getElementById("bot_type3").addEventListener("click", function () {

});

// 의자 시트 타입
document.getElementById("seat_type1").addEventListener("click", function () {

});
document.getElementById("seat_type2").addEventListener("click", function () {

});
document.getElementById("seat_type3").addEventListener("click", function () {

});
document.getElementById("seat_type4").addEventListener("click", function () {

});

