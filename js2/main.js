
         	var camera,scene,renderer, controls;
			var mapCamera, mapWidth = 240, mapHeight = 160;


			var controlsEnabled = true;

			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var shift = false;
			var space = false;

			var prevTime = performance.now();
			var velocity = new THREE.Vector3();
			var direction = new THREE.Vector3();
			var color = new THREE.Color();
			var box = new THREE.Box3();
			var min;
			var max;


				scene = new THREE.Scene();

				var ratio = window.innerWidth/window.innerHeight;
				camera = new THREE.PerspectiveCamera(80,ratio,5,5000000);
				var Pos = new THREE.Vector3(0,1,0);
				camera.position.set(Pos.x,Pos.y,Pos.z);
				var Dir = new THREE.Vector3(0,0,1);
				camera.lookAt(Dir.x,Dir.y,Dir.z);
				scene.add(camera);

				// orthographic cameras
				mapCamera = new THREE.OrthographicCamera(
				window.innerWidth / -1.9,		// Left
				window.innerWidth / 1.9,		// Right
				window.innerHeight / 1.9,		// Top
				window.innerHeight / -1.9,	// Bottom
				-5000,            			// Near 
				10000 );           			// Far 
				mapCamera.up = new THREE.Vector3(0,0,-1);
				mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
				scene.add(mapCamera);


				controls = new THREE.PointerLockControls( camera );

        		controls.enabled = true;
				scene.add( controls.getObject() );

				var onKeyDown = function ( event ) {

					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = true;
							break;

						case 37: // left
						case 65: // a
							moveLeft = true;
              				break;

						case 40: // down
						case 83: // s
							moveBackward = true;
							break;

						case 39: // right
						case 68: // d
							moveRight = true;
							break;

						case 16: //shift
							shift = true;
							break;
						
						case 32: //space
							space = true;
							break;
					}

				};

				var onKeyUp = function ( event ) {

					switch( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;

						case 16: //shift
							shift = false;
							break;
							
						case 32: //space
						space = false;
						break;

					}
				};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

var renderer = new THREE.WebGLRenderer({ antialias: true } ); 
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement );
window.addEventListener( 'resize', onWindowResize, false );

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
const materialArray = createMaterialArray(skyboxImage);
const materialArray2 = createMaterialArray(skyboxImage2);
const materialArray3 = createMaterialArray(skyboxImage3);
const materialArray4 = createMaterialArray(skyboxImage4);
skyboxGeo = new THREE.BoxGeometry(60000, 60000, 60000);
skybox = new THREE.Mesh(skyboxGeo, materialArray2);
scene.add(skybox);

//controls = new THREE.OrbitControls( camera, renderer.domElement );

function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
   skybox.rotation.y += 0.01;
   requestAnimationFrame( animate );
   render();

   if ( controlsEnabled == true ) {

     var time = performance.now();
     var delta =  ( time - prevTime ) / 1000;

     velocity.x -= velocity.x * 15.0 * delta;
     velocity.z -= velocity.z * 15.0 * delta;
     velocity.y -= velocity.y * 15.0 * delta;

     direction.z = Number( moveForward ) - Number( moveBackward );
     direction.x = Number( moveLeft ) - Number( moveRight );
     direction.normalize();

     if ( moveForward || moveBackward ) velocity.z -= direction.z * 450.0 * delta;
     if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z -= direction.z * 500.0 * delta;
     if ( moveLeft || moveRight ) velocity.x -= direction.x * 450.0 * delta;
     if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x -= direction.x * 500.0 * delta;
     if ( space ) {
        if ( controls.getObject().position.y < 13) {
			velocity.y += 1 * 500.0 * delta;
        }
     }

     controls.getObject().translateX( velocity.x * delta );
     controls.getObject().translateZ( velocity.z * delta );
     controls.getObject().translateY( velocity.y * delta );

     if (controls.getObject().position.y > 11 ) {
		velocity.y -= 1 * 500.0 * delta;
     }
	// console.log(controls.getObject().position.y);
     prevTime = time;

  }
            renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setClearColor( 0x000000, 1 );
			renderer.autoClear = false;
}

function render() 
{
   var w = window.innerWidth, h = window.innerHeight;

	// setViewport parameters:
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	renderer.setViewport( 0, 0, w, h );
	renderer.clear();
	
	// full display
	// renderer.setViewport( 0, 0, SCREEN_WIDTH - 2, 0.5 * SCREEN_HEIGHT - 2 );
	renderer.render( scene, camera );
	
	// minimap (overhead orthogonal camera)
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	renderer.setViewport( 10, h - mapHeight - 10, mapWidth, mapHeight );
	renderer.render( scene, mapCamera );
}
	animate();

