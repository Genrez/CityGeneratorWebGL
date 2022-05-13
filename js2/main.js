var scene = new THREE.Scene( );
var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(80,ratio,5,500000);
camera.position.set(0,0,2000);


camera.lookAt(scene.position);
camera.rotation.x = Math.PI/4;
camera.rotation.y = Math.PI/4;
camera.rotation.z = Math.PI/4;

 
var renderer = new THREE.WebGLRenderer( ); 
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement );
scene.background = new THREE.Color( 0x8fd9d9 );

//Plane
var dirtTexture = new THREE.TextureLoader().load("textures/Dirt1.jpg");
var geometry = new THREE.PlaneGeometry(5000,5000);
var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
material.map = dirtTexture;
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(10,10);
var plane = new THREE.Mesh( geometry, material );
plane.material.side = THREE.DoubleSide;
plane.rotation.set(Math.PI / 2, 0, 0);
scene.add( plane );

  

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

