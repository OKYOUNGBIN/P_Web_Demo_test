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
            // get secure url from our server
            const { tempUrl } = await fetch("/s3Url").then(res => res.json())
            console.log(tempUrl)
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
    const { savedUrl } = await fetch("/s3Url").then(res => res.json())
    console.log(savedUrl)
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

    const model = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
    model.src = savedGlbUrl
    // // get secure url from our server
    // const { generateUrl } = await fetch("/s3Url").then(res => res.json())
    // console.log(generateUrl)
    // // post the image direclty to the s3 bucket
    // await fetch(generateUrl, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "multipart/form-data"
    //     },
    //     body: file
    // })

    // const savedGlbUrl = generateUrl.split('?')[0]
    // console.log(savedGlbUrl)

    // const model = document.querySelector("#editing_adapter").shadowRoot.querySelector("model-viewer")
    // model.src = savedGlbUrl
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