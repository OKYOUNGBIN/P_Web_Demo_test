import * as THREE from '../../node_modules/three/build/three.module.js'
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import {GLTFExporter} from '../../node_modules/three/examples/jsm/exporters/GLTFExporter.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector("#c")
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
document.body.prepend(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

setTimeout(function() {
    document.querySelector(".modal").style.display = "none";
},1500);

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

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 1);
controls.update();

const config = {
    headers: {
        'Content-type' : 'application/json'
    }
}

const { tempUrl } = await fetch("https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-temp/", config).then(res => res.json())   // 원본 glb s3 bucket
const { savedUrl } = await fetch("https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-saved/", config).then(res => res.json()) // 편집한 glb s3 bucket
const { htmlUrl } = await fetch("https://d2d3yuaczk15qx.cloudfront.net/shop_file/xr-viewer/", config).then(res => res.json())   // scene viewer html 파일 s3 bucket
//다운로드 버튼 생성 후 이벤트 추가
const btn = document.querySelector('.download-glb');
btn.addEventListener('click', uploadTempS3)
//gltfExporter을 이용해 생성된 버튼
function uploadTempS3(event) {
    event.preventDefault()
    window.scrollTo({
        top: 2928,
        left: 1945,
        behavior: 'smooth'
    });
    const exporter = new GLTFExporter();
    // 배열에 여러가지 gltf변수 넣기[]
    exporter.parse([scene],
        // 해당 씬을 저장
        async function (result) {
            const file = result;

            // post the image direclty to the s3 bucket
            await fetch(tempUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            })

            const tempGlbUrl = tempUrl.split('?')[0]
            console.log(tempGlbUrl)

            const model = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
            model.src = tempGlbUrl
        },
        { binary: true },
    );
}
const downloadGlb = document.querySelector('#downloadGlb')
downloadGlb.addEventListener('click', localDownGlb)
async function localDownGlb(){
    const modelViewer = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
    const glTF = await modelViewer.exportScene();
    var file = new File([glTF], "export.glb");
    var link = document.createElement("a");
    link.download =file.name;
    link.href = URL.createObjectURL(file);
    link.click();
}

const exportGlb = document.querySelector('#glbExportBtn');
exportGlb.addEventListener('click', exportModelViewer)
async function exportModelViewer() {
    const modelViewer = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
    const glTF = await modelViewer.exportScene();
    var file = new File([glTF], "");

    // post the image direclty to the s3 bucket
    await fetch(savedUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const savedGlbUrl = savedUrl.split('?')[0]
    console.log(savedGlbUrl)

    const htmlComponent =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Model Viewer</title>
            <link rel="stylesheet" href="./style.css">
            <link rel="shortcut icon" type="image/png" href="../../shared-assets/icons/favicon.png" />
            <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        </head>
        <body>
        <model-viewer
        camera-controls
        ar
        ar-modes="scene-viewer quick-look webxr"
        autoplay
        environment-image="https://xr-box.s3.ap-northeast-2.amazonaws.com/shop_file/xr-viewer/images/photo_studio_01_1k.hdr"
        exposure="0.35"
        alt="B_Shelf"
        src="${savedGlbUrl}"
        bounds="tight">
            <button class="arStart" slot="ar-button">
                <span class="material-icons">view_in_ar</span>
                <br>
                <b>XR 미리보기</b>
            </button>
        </model-viewer>
        </body>
        </html>`;
    const newHtmlDoc = document.implementation.createHTMLDocument()
    newHtmlDoc.innerHTML = htmlComponent;

    // post the image direclty to the s3 bucket
    await fetch(htmlUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "text/html"
        },
        body: htmlComponent
    })
    const htmlViewerUrl = htmlUrl.split('?')[0]
    console.log(htmlViewerUrl)

    document.getElementById('inputUrl').value = htmlViewerUrl
    let copyText = document.getElementById('urlCopyBtn').addEventListener('click', urlCopy);
    function urlCopy() {
        document.querySelector("#inputUrl").select();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        setTimeout(function () {
        }, 2500);
    }
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: `${htmlViewerUrl}`,
        width: 128,
        height: 128,
        colorDark : "#ffffff",
        colorLight : "#000000",
        correctLevel : QRCode.CorrectLevel.H
    });
}


//document.querySelector("body > model-editor > div > div > me-tabs > me-tabbed-panel:nth-child(1) > me-materials-panel").shadowRoot.querySelector("#material-container2-btn")

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
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

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateWorldMatrix();
    }
};

animate();

export { scene, camera, renderer }