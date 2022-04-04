import * as THREE from 'https://cdn.skypack.dev/three@0.132.2'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'
import GltfExporter from 'https://cdn.skypack.dev/three-gltf-exporter';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new THREE.DirectionalLight(0xFFFFFF);
scene.add(light);

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 1);
controls.update();

//다운로드 버튼 생성 후 이벤트 추가
const btn = document.getElementById('download-glb');
btn.addEventListener('click', download)
//gltfExporter을 이용해 생성된 버튼
function download(event) {
    event.preventDefault()
    const exporter = new GltfExporter();
    // 배열에 여러가지 gltf변수 넣기[]
    exporter.parse([scene],
        // 해당 씬을 저장
        async function (result) {
            const file = result;

            // get secure url from our server
            const { url } = await fetch("/s3Url").then(res => res.json())
            console.log(url)
            
            // post the image direclty to the s3 bucket
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            })

            const glbUrl = url.split('?')[0]
            console.log(glbUrl)

            const model = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
            model.src = glbUrl
        },
        { binary: true },
        );
    }

const glbExportBtn = document.querySelector("#glbExportBtn")
glbExportBtn.addEventListener('click', gltfExportBtn)
async function gltfExportBtn(){
    const model = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
    const glTF = await model.exportScene();
    var file = new File([glTF], "export.glb");
    var link = document.createElement("a");
    link.download =file.name;
    link.href = URL.createObjectURL(file);
    link.click();
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

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
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateWorldMatrix();
    }
};

animate();

export { scene }