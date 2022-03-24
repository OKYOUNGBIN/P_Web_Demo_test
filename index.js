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

// // Instantiate a exporter
const exporter = new GltfExporter();

// Parse the input and generate the glTF output
exporter.parse(
	scene,
	// called when the gltf has been generated
	function ( gltf ) {

		console.log( gltf );
		downloadJSON( gltf );

	},
	function ( error ) {
		console.log( 'An error happened' );
	},
	options
);

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