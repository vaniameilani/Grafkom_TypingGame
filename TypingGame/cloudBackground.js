//COLORS
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
	ground:0x87431d,
	lightgreen:0x629265,
    blue:0x68c3c0,
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };

var clouds = [];
var group1 = new THREE.Group();
var group2 = new THREE.Group();

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {
    // Get the width and the height of the screen,
    // use them to set up the aspect ratio of the camera 
    // and the size of the renderer.
    HEIGHT = window.innerHeight;
    WIDTH  = window.innerWidth;

    scene = new THREE.Scene();

    // Create the camera
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView, aspectRatio,
        nearPlane, farPlane
    );
	
  	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
    scene.fog = new THREE.Fog(0xf7d9aa, 100,950);

  	// Set the position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

  	// Allow transparency to show the gradient background
	// we defined in the CSS
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

  	// Add the DOM element of the renderer to the 
	// container we created in the HTML
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
	// update height and width of the renderer and the camera
    HEIGHT = window.innerHeight;
    WIDTH  = window.innerWidth;

    renderer.setSize(WIDTH, HEIGHT);

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

Sky = function(){

    this.nClouds = 15;
    // var index = 0;
    // var stepAngle = Math.PI*2 / this.nClouds;


    for (var i = 0; i < this.nClouds; i++) { 
        let loader = new THREE.GLTFLoader();
        loader.load('assets/scene.gltf', function(gltf){
            cloud = gltf.scene.children[0];

            cloud.position.y = -200+Math.random()*(HEIGHT-300);
            cloud.position.x = -800+Math.random()*WIDTH;
            cloud.position.z = -400-Math.random()*200;

            // c[i].position.y = -200+Math.random()*(HEIGHT-300);
            // c[i].position.x = -800+Math.random()*WIDTH;
            // c[i].position.z = -400-Math.random()*200;
           
            var s = 1+Math.random()*3;
            cloud.scale.set(s,s,s);

            group1.add(cloud);
        });

    }

    for (var i = 0; i < this.nClouds; i++) { 
        let loader = new THREE.GLTFLoader();
        loader.load('assets/scene.gltf', function(gltf){
            cloud = gltf.scene.children[0];
            // c[i] = cloud;
            // console.log(c[i]);

            cloud.position.y = -200+Math.random()*(HEIGHT-300);
            cloud.position.x = -800+Math.random()*WIDTH;
            cloud.position.z = -400-Math.random()*200;

            // c[i].position.y = -200+Math.random()*(HEIGHT-300);
            // c[i].position.x = -800+Math.random()*WIDTH;
            // c[i].position.z = -400-Math.random()*200;
           
            var s = 1+Math.random()*3;
            cloud.scale.set(s,s,s);

            // group1.add(cloud);
            group2.add(cloud);

        });

    }

    scene.add(group1);

    group2.position.x = window.innerWidth;
    scene.add(group2);

    // console.log(group1.position.x);

    // console.log(c[0]);

}

Sea = function(){
    var geometry = new THREE.BoxBufferGeometry( 2000, 730, 900 );
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    
    var material = new THREE.MeshBasicMaterial({
        color:Colors.lightgreen,
        transparent:true,
        // opacity:.6,
        flatShading:true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
}

Sun = function(){

	this.mesh = new THREE.Object3D();

	var sunGeom = new THREE.SphereGeometry( 400, 20, 10 );
	var sunMat  = new THREE.MeshBasicMaterial({
		color:Colors.yellow
    });
    
	var sun = new THREE.Mesh(sunGeom, sunMat);
	sun.castShadow = false;
	sun.receiveShadow = false;
	this.mesh.add(sun);
}

// 3D Models
var sea;


function createSea(){
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
}

function createSky(){
    sky = new Sky();
    // sky.mesh.position.y = -600;
    // scene.add(sky.mesh);
}

function createSun(){ 
	sun = new Sun();
	sun.mesh.scale.set(1,1,.3);
	sun.mesh.position.set(0,-30,-850);
	scene.add(sun.mesh);
}

function loop(){

    renderer.render(scene, camera);
    requestAnimationFrame(loop);

    group1.position.x -= 1;
    group2.position.x -= 1;


    if (group1.position.x === -(window.innerWidth)) {
        console.log("udah ujung" + group1.position.x);
        // createSky();
        group1.position.x = window.innerWidth + 100;
    }
    if (group2.position.x === -(window.innerWidth)) {
        console.log("udah ujung" + group2.position.x);
        // createSky();
        group2.position.x = window.innerWidth + 100;
    }
}

function normalize( v, vmin, vmax, tmin, tmax ){
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax-vmin;
    var pc = (nv-vmin)/dv;
    var dt = tmax-tmin;
    var tv = tmin + (pc*dt);
    return tv;
}

function init(event){
    document.addEventListener('mousemove', handleMouseMove, false);
    createScene();
    createLights();
    createSea();
    createSun();
    createSky();
    loop();
}

// HANDLE MOUSE EVENTS

var mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
    var tx = -1 + (event.clientX / WIDTH)*2;
    var ty = 1 - (event.clientY / HEIGHT)*2;
    mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);