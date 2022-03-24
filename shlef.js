import { GLTFLoader } from 'https://cdn.skypack.dev/qdcz-threejs';
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
let pipe_size2 = loadModel("./models/chair/pipe/shelf_0301_t50_h600_w800.glb").then(result => { pipe2 = result.scene; });
let pipe_size3 = loadModel("./models/chair/pipe/shelf_0301_t50_h600_w1200.glb").then(result => { pipe3 = result.scene; });
let pipe_size4 = loadModel("./models/chair/pipe/shelf_0301_t50_h1200_w600.glb").then(result => { pipe4 = result.scene; });
let pipe_size5 = loadModel("./models/chair/pipe/shelf_0301_t50_h1200_w800.glb").then(result => { pipe5 = result.scene; });
let pipe_size6 = loadModel("./models/chair/pipe/shelf_0301_t50_h1200_w1200.glb").then(result => { pipe6 = result.scene; });
let pipe_size7 = loadModel("./models/chair/pipe/shelf_0301_t50_h1500_w600.glb").then(result => { pipe7 = result.scene; });
let pipe_size8 = loadModel("./models/chair/pipe/shelf_0301_t50_h1500_w800.glb").then(result => { pipe8 = result.scene; });
let pipe_size9 = loadModel("./models/chair/pipe/shelf_0301_t50_h1500_w1200.glb").then(result => { pipe9 = result.scene; });
let pipe_size10 = loadModel("./models/chair/pipe/shelf_0301_t50_h1800_w600.glb").then(result => { pipe10 = result.scene; });
let pipe_size11 = loadModel("./models/chair/pipe/shelf_0301_t50_h1800_w800.glb").then(result => { pipe11 = result.scene; });
let pipe_size12 = loadModel("./models/chair/pipe/shelf_0301_t50_h1800_w1200.glb").then(result => { pipe12 = result.scene; });
let pipe_size13 = loadModel("./models/chair/pipe/shelf_0301_t50_h2100_w600.glb").then(result => { pipe13 = result.scene; });
let pipe_size14 = loadModel("./models/chair/pipe/shelf_0301_t50_h2100_w800.glb").then(result => { pipe14 = result.scene; });
let pipe_size15 = loadModel("./models/chair/pipe/shelf_0301_t50_h2100_w1200.glb").then(result => { pipe15 = result.scene; });
let pipe_size16 = loadModel("./models/chair/pipe/shelf_0301_t50_h2400_w600.glb").then(result => { pipe16 = result.scene; });
let pipe_size17 = loadModel("./models/chair/pipe/shelf_0301_t50_h2400_w800.glb").then(result => { pipe17 = result.scene; });
let pipe_size18 = loadModel("./models/chair/pipe/shelf_0301_t50_h2400_w1200.glb").then(result => { pipe18 = result.scene; });

Promise.all(
    [bot_frame_size1, bot_frame_size2, bot_frame_size3, top_frame_size1, top_frame_size2, top_frame_size3,
        pipe_size1, pipe_size2, pipe_size3, pipe_size4, pipe_size5, pipe_size6, pipe_size7, pipe_size8, pipe_size9, pipe_size10, pipe_size11, pipe_size12,
        pipe_size13, pipe_size14, pipe_size15, pipe_size16, pipe_size17, pipe_size18]).then(() => {

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


//다운로드 버튼 생성 후 이벤트 추가
const btn = document.getElementById('download-glb');
btn.addEventListener('click', download)

// gltfExporter을 이용해 생성된 버튼
function download() {
    const exporter = new GLTFExporter();
    // 배열에 여러가지 gltf변수 넣기[]
    exporter.parse([theModel1, theModel2, theModel3],
        // 해당 씬을 저장
        function (result) {
            // 저장할 때 이름 
            saveArrayBuffer(result, 'Shelf.glb');
        },
        { binary: true }
    );
}

// 저장하기
function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}
//링크 생성 a태그
const link = document.createElement('a');

// 위에서 생성한 링크 태그 a로 연결
document.body.appendChild(link);

function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}