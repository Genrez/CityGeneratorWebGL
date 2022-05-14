var scene = new THREE.Scene( );
var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(80,ratio,5,5000000);

var Pos = new THREE.Vector3(-360, 700, 360);
camera.position.set(Pos.x, Pos.y, Pos.z);
var Dir = new THREE.Vector3(0, 0, 0);
camera.lookAt(Dir.x, Dir.y, Dir.z);

var renderer = new THREE.WebGLRenderer( ); 
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement );
scene.background = new THREE.Color( 0x8fd9d9 );

//Plane
/*var dirtTexture = new THREE.TextureLoader().load("textures/Dirt1.jpg");
var geometry = new THREE.PlaneGeometry(60000,60000);
var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
material.map = dirtTexture;
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(10,10);
var plane = new THREE.Mesh( geometry, material );
plane.material.side = THREE.DoubleSide;
plane.rotation.set(Math.PI / 2, 0, 0);
plane.receiveShadow = true;
plane.castShadow = false;
scene.add( plane );
*/
//PointLight
let sun = new THREE.DirectionalLight(0xFFFFFF, 1);
sun.position.set(2,10,1);
sun.target.position.set(0,0,0);
scene.add(sun);
scene.add(sun.target);


//Skybox
function createPathStrings(filename) {
   const basePath = "./img/Skyboxes/";
   const baseFilename = basePath + filename;
   const fileType = ".png";
   const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
   const pathStings = sides.map(side => {
   return baseFilename + "_" + side + fileType;
   });
   return pathStings;
 }

function createMaterialArray(filename) {
   const skyboxImagepaths = createPathStrings(filename);
   const materialArray = skyboxImagepaths.map(image => {
   let texture = new THREE.TextureLoader().load(image);
   return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
   });
   return materialArray;
 }

const skyboxImage = 'skybox';
const skyboxImage2 = 'clouds';
const skyboxImage3 = 'clouds2';
const skyboxImage4 = 'interstellar';
const materialArray = createMaterialArray(skyboxImage2);
skyboxGeo = new THREE.BoxGeometry(60000, 60000, 60000);
skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

controls = new THREE.OrbitControls( camera, renderer.domElement );

function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
   //skybox.rotation.x += 0.005;
   requestAnimationFrame( animate );
   render();
}

function render() 
{

	renderer.render( scene, camera );
}
	animate();

