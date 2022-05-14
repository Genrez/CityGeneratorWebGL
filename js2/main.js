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
var dirtTexture = new THREE.TextureLoader().load("textures/Dirt1.jpg");
var geometry = new THREE.PlaneGeometry(30000,30000);
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

//Skybox
skyboxGeo = new THREE.BoxGeometry(40000, 40000, 40000);
skybox = new THREE.Mesh(skyboxGeo);
scene.add(skybox);

//Lighting
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

controls = new THREE.OrbitControls( camera, renderer.domElement );

var MyUpdateLoop = function ( )
{
   renderer.render(scene,camera);
   controls.update();
   requestAnimationFrame(MyUpdateLoop);
};
requestAnimationFrame(MyUpdateLoop);

var MyResize = function ( )
{
var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize(width,height);
camera.aspect = width/height;
camera.updateProjectionMatrix();
renderer.render(scene,camera);
};
window.addEventListener( 'resize', MyResize);

