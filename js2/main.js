
         	
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
				var listener = new THREE.AudioListener();
				camera.add( listener );
				const audioLoader = new THREE.AudioLoader();
				var sound = new THREE.Audio( listener );
				audioLoader.load( '/sounds/footsteps.wav', function( buffer ) {
					sound.setBuffer( buffer );
					sound.setLoop( true );
					sound.setVolume( 1.5 );
				});
				var Pos = new THREE.Vector3(0,1,0);
				camera.position.set(Pos.x,Pos.y,Pos.z);
				var Dir = new THREE.Vector3(0,0,1);
				camera.lookAt(Dir.x,Dir.y,Dir.z);

				var OrbitPos = new THREE.Vector3(0,500,0);
				var OrbitDir = new THREE.Vector3(0,0,0);

				//var boundingBox = new THREE.Box3().fromObject( camera );
                //var collision = boundingBox.containsPoint( camera.position );
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




var renderer = new THREE.WebGLRenderer({ antialias: true } ); 
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement );
window.addEventListener( 'resize', onWindowResize, false );

//var ballGeometry = new THREE.SphereGeometry( 60, 64, 64 );
//var ball = new THREE.Mesh(	ballGeometry, customMaterial );
//ball.position.set(sunX,sunY,sunZ);
//ball.castShadow = false;
//ball.receiveShadow = false;
//sun.add( ball );

//const helper = new THREE.DirectionalLightHelper( sun, 5 );
//scene.add( helper );

//Plane
var planeGeometry = new THREE.PlaneGeometry(3000,3000,1,1);
var dirtTexture = new THREE.TextureLoader().load( './textures/Dirt1.jpg' );
dirtTexture.wrapS = THREE.RepeatWrapping;
dirtTexture.wrapT = THREE.RepeatWrapping;
dirtTexture.repeat.set( 5, 5 );
var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide, map: dirtTexture } );
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -Math.PI/2;
scene.add(plane);

//Skybox
var skyBoxRotation = 0.001;
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

animate();

function animate() {
   skybox.rotation.y += skyBoxRotation;
   requestAnimationFrame( animate );
   var mesh = scene.getObjectByName("snow");
   if (mesh) {
   updateParticles();
   }
   var mesh = scene.getObjectByName("rain");
   if (mesh) {
   updateParticlesRain()
   }
   render();
   update();

   if ( controlsEnabled == true ) {

     var time = performance.now();
     var delta =  ( time - prevTime ) / 1000;

     velocity.x -= velocity.x * 15.0 * delta;
     velocity.z -= velocity.z * 15.0 * delta;
     velocity.y -= velocity.y * 15.0 * delta;

     direction.z = Number( moveForward ) - Number( moveBackward );
     direction.x = Number( moveLeft ) - Number( moveRight );
     direction.normalize();

     if ( moveForward || moveBackward ) {
		 velocity.z -= direction.z * 450.0 * delta;
		sound.play();
	}
     if ( (moveForward && shift) || (moveBackward && shift) ) {
		 velocity.z -= direction.z * 500.0 * delta;
		 sound.playbackRate = 1.5;
		 sound.play();
	 }
     if ( moveLeft || moveRight ) {
		 velocity.x -= direction.x * 450.0 * delta;
		 sound.play();
	 }
     if ( (moveLeft && shift) || (moveRight && shift) ) {
		 velocity.x -= direction.x * 500.0 * delta;
		 sound.playbackRate = 1.5;
		 sound.play();
	 }
	 if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
		 sound.pause();
	 }
	 if (!shift) {
		 sound.playbackRate = 1;
	 }
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

	 //Collision detection for plane edges
				if (controls.getObject().position.x < -AsphaltX/2) {
					if ( moveForward || moveBackward ) velocity.z = 100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = 100;
					if ( moveLeft || moveRight ) velocity.x = 100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = 100;
				}

				if (controls.getObject().position.x > AsphaltX/2) {
					if ( moveForward || moveBackward ) velocity.z = -100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = -100;
					if ( moveLeft || moveRight ) velocity.x = -100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = -100;
				}

				if (controls.getObject().position.z < -AsphaltZ/2) {
					if ( moveForward || moveBackward ) velocity.z = 100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = 100;
					if ( moveLeft || moveRight ) velocity.x = 100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = 100;
				}

				if (controls.getObject().position.z > AsphaltX/2) {
					if ( moveForward || moveBackward ) velocity.z = -100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = -100;
					if ( moveLeft || moveRight ) velocity.x = -100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = -100;
				}
	//  console.log(controls.getObject().position.x);
	//  console.log(controls.getObject().position.z);
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

function update()
{	
}

function updateParticles() {
	for (let i = 0; i < numSnowflakes*3; i +=3) {
		particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
		particles.geometry.attributes.position.array[i+1] -= particles.geometry.attributes.velocity.array[i+1];
        particles.geometry.attributes.position.array[i+2] -= particles.geometry.attributes.velocity.array[i+2];

		if (particles.geometry.attributes.position.array[i+1] < 0) {
			particles.geometry.attributes.position.array[i] = Math.floor(Math.random()*maxRange - minRange);
			particles.geometry.attributes.position.array[i+1] = Math.floor(Math.random()*maxRange + minRange);
			particles.geometry.attributes.position.array[i+2] = Math.floor(Math.random()*maxRange - minRange);
		}
	}
	particles.geometry.attributes.position.needsUpdate = true;
}

function updateParticlesRain() {
	for (let i = 0; i < numRaindrops*3; i +=3) {
		rainparticles.geometry.attributes.position.array[i] -= rainparticles.geometry.attributes.velocity.array[i];
		rainparticles.geometry.attributes.position.array[i+1] -= rainparticles.geometry.attributes.velocity.array[i+1];
        rainparticles.geometry.attributes.position.array[i+2] -= rainparticles.geometry.attributes.velocity.array[i+2];

		if (rainparticles.geometry.attributes.position.array[i+1] < 0) {
			rainparticles.geometry.attributes.position.array[i] = Math.floor(Math.random()*maxRange - minRange);
			rainparticles.geometry.attributes.position.array[i+1] = Math.floor(Math.random()*maxRange + minRange);
			rainparticles.geometry.attributes.position.array[i+2] = Math.floor(Math.random()*maxRange - minRange);
		}
	}
	rainparticles.geometry.attributes.position.needsUpdate = true;
}

