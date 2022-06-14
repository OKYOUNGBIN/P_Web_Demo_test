import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from '../index.js'

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

let shelf_600

let shelf_1 = loadModel("../../shelf/sangdo_monsterplus_shelf_600x2400.glb").then(result => { shelf_600 = result.scene; });

Promise.all(
    [shelf_1,
    ]).then(() => {
            shelf_600.visible = false;
            shelf_600.children[0].visible = false;

            scene.add(shelf_600)
        });
        
document.getElementById("shelf_600_1").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;
    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[9].visible = true;
    
    shelf_600.children[0].children[2].visible = false;
    shelf_600.children[0].children[3].visible = false;
    shelf_600.children[0].children[4].visible = false;
    shelf_600.children[0].children[5].visible = false;
    shelf_600.children[0].children[6].visible = false;
    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;
    
    shelf_600.children[0].children[10].visible = false;
    shelf_600.children[0].children[11].visible = false;
    shelf_600.children[0].children[12].visible = false;
    shelf_600.children[0].children[13].visible = false;
    shelf_600.children[0].children[14].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false; 
});

document.getElementById("shelf_600_2").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;

    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[2].visible = true;
    shelf_600.children[0].children[9].visible = true;
    shelf_600.children[0].children[10].visible = true;

    shelf_600.children[0].children[3].visible = false;
    shelf_600.children[0].children[4].visible = false;
    shelf_600.children[0].children[5].visible = false;
    shelf_600.children[0].children[6].visible = false;
    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;    
    
    shelf_600.children[0].children[11].visible = false;
    shelf_600.children[0].children[12].visible = false;
    shelf_600.children[0].children[13].visible = false;
    shelf_600.children[0].children[14].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false;
});

document.getElementById("shelf_600_3").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;

    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[2].visible = true;
    shelf_600.children[0].children[3].visible = true;
    shelf_600.children[0].children[9].visible = true;
    shelf_600.children[0].children[10].visible = true;
    shelf_600.children[0].children[11].visible = true;
    
    shelf_600.children[0].children[4].visible = false;
    shelf_600.children[0].children[5].visible = false;
    shelf_600.children[0].children[6].visible = false;
    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;
    
    shelf_600.children[0].children[12].visible = false;
    shelf_600.children[0].children[13].visible = false;
    shelf_600.children[0].children[14].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false;
});

document.getElementById("shelf_600_4").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;
    
    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[2].visible = true;
    shelf_600.children[0].children[3].visible = true;
    shelf_600.children[0].children[4].visible = true;
    
    shelf_600.children[0].children[9].visible = true;
    shelf_600.children[0].children[10].visible = true;
    shelf_600.children[0].children[11].visible = true;
    shelf_600.children[0].children[12].visible = true;
    
    shelf_600.children[0].children[5].visible = false;
    shelf_600.children[0].children[6].visible = false;
    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;
    shelf_600.children[0].children[13].visible = false;
    shelf_600.children[0].children[14].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false;
});

document.getElementById("shelf_600_5").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;
    
    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[2].visible = true;
    shelf_600.children[0].children[3].visible = true;
    shelf_600.children[0].children[4].visible = true;
    shelf_600.children[0].children[5].visible = true;
    shelf_600.children[0].children[9].visible = true;
    shelf_600.children[0].children[10].visible = true;
    shelf_600.children[0].children[11].visible = true;
    shelf_600.children[0].children[12].visible = true;
    shelf_600.children[0].children[13].visible = true;
    
    shelf_600.children[0].children[6].visible = false;
    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;
    shelf_600.children[0].children[14].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false;
});

document.getElementById("shelf_600_6").addEventListener("click", function () {
    shelf_600.visible = true;
    shelf_600.children[0].visible = !shelf_600.children[0].visible;
    
    shelf_600.children[0].children[0].visible = true;
    shelf_600.children[0].children[1].visible = true;
    shelf_600.children[0].children[2].visible = true;
    shelf_600.children[0].children[3].visible = true;
    shelf_600.children[0].children[4].visible = true;
    shelf_600.children[0].children[5].visible = true;
    shelf_600.children[0].children[6].visible = true;
    shelf_600.children[0].children[9].visible = true;
    shelf_600.children[0].children[10].visible = true;
    shelf_600.children[0].children[11].visible = true;
    shelf_600.children[0].children[12].visible = true;
    shelf_600.children[0].children[13].visible = true;
    shelf_600.children[0].children[14].visible = true;

    shelf_600.children[0].children[7].visible = false;
    shelf_600.children[0].children[8].visible = false;
    shelf_600.children[0].children[15].visible = false;
    shelf_600.children[0].children[16].visible = false;
});

