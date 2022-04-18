import * as THREE from 'three'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'
import GltfExporter from 'https://cdn.skypack.dev/three-gltf-exporter';


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

const { tempUrl } = await fetch("/s3UrlTemp").then(res => res.json())   // 원본 glb s3 bucket
const { savedUrl } = await fetch("/s3UrlSaved").then(res => res.json()) // 편집한 glb s3 bucket
const { htmlUrl } = await fetch("/s3UrlHtml").then(res => res.json())   // scene viewer html 파일 s3 bucket
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
    const exporter = new GltfExporter();
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
        exposure="2"
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
}

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

export { scene }