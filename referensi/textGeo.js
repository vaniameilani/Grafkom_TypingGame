var scene;
var camera;
var renders;
var canv;
var sinar;

var kerangka1;
var kulit1;
var loader;
var kalimat;

persiapan();
benda();
camera();
cahaya();
render();

// mempersiapkan canvas
function persiapan() {
    canv = document.getElementById ("canv");
    scene = new THREE.scene();
    renders = new THREE.WebGLRenderer();
    renders.setSize (1200,600);
    renders.shadowMap.enabled = true;
    canv.appendChild(renders.domElement);
}

function benda() {
    //jenis font yang digunakan
    loader = new THREE.FontLoader();

    loader.load("Bebas_Regular.json", function(res) {
        kerangka1 = new THREE.TextGeometry("VaniaMeith", {
            Font : res, 
            size : 50
        });

        kulit1 = new THREE.MeshLambertMaterial({color : 0xffaa00});

        kalimat = new THREE.Mesh(kerangka1, kulit1);

        scene.add(kalimat);

        kalimat.position.x = -100;
    });
}

function camera() {
    camera = new THREE.PerspectiveCamera(100, 2, 1, 1000);
    camera.position.z = 200;
    camera.lookAt(new THREE.Vector3 (0, 0, 0));
}

function cahaya() {
    sinar = new THREE.AmbientLight (0x808080);
    scene.add(sinar);

    sinar = new THREE.SpotLight(0xffffff);
    sinar.position.z = 200;
    sinar.position.x = -300;
    scene.add(sinar);
}

function render() {
    requestAnimationFrame(render);
    renders.render(scene, camera);
}



