const _sunVS = `
uniform sampler2D noiseTexture;
uniform float noiseScale;

uniform sampler2D bumpTexture;
uniform float bumpSpeed;
uniform float bumpScale;

uniform float time;

varying vec2 vUv;

void main() 
{ 
    vUv = uv;
	
	vec2 uvTimeShift = vUv + vec2( 1.1, 1.9 ) * time * bumpSpeed;
	vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );
	vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.g );
	vec4 bumpData = texture2D( bumpTexture, uvTimeShift );
	float displacement = ( vUv.y > 0.999 || vUv.y < 0.001 ) ? 
		bumpScale * (0.3 + 0.02 * sin(time)) :  
		bumpScale * bumpData.r;
    vec3 newPosition = position + normal * displacement;
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`

const _sunFS = `
uniform sampler2D baseTexture;
uniform float baseSpeed;
uniform float repeatS;
uniform float repeatT;

uniform sampler2D noiseTexture;
uniform float noiseScale;

uniform sampler2D blendTexture;
uniform float blendSpeed;
uniform float blendOffset;

uniform float time;
uniform float alpha;

varying vec2 vUv;

void main() 
{
	vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * time * baseSpeed;	
	vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );
	vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );
	vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift * vec2(repeatS, repeatT) );

	vec2 uvTimeShift2 = vUv + vec2( 1.3, -1.7 ) * time * blendSpeed;	
	vec4 noiseGeneratorTimeShift2 = texture2D( noiseTexture, uvTimeShift2 );
	vec2 uvNoiseTimeShift2 = vUv + noiseScale * vec2( noiseGeneratorTimeShift2.g, noiseGeneratorTimeShift2.b );
	vec4 blendColor = texture2D( blendTexture, uvNoiseTimeShift2 * vec2(repeatS, repeatT) ) - blendOffset * vec4(1.0, 1.0, 1.0, 1.0);

	vec4 theColor = baseColor + blendColor;
	theColor.a = alpha;
	gl_FragColor = theColor;
}  
`
         	
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

var lavaTexture = new THREE.ImageUtils.loadTexture( 'img/lava.jpg');
var baseSpeed = 0.02;
var repeatS = repeatT = 4.0;

var noiseTexture = new THREE.ImageUtils.loadTexture( 'img/cloud.png' );
noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
var noiseScale = 0.5;

var blendTexture = new THREE.ImageUtils.loadTexture( 'img/lava.jpg' );
blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping; 
var blendSpeed = 0.01;
var blendOffset = 0.25;
var bumpTexture = noiseTexture;
bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 	
var bumpSpeed   = 0.15;
var bumpScale   = 40.0;

this.customUniforms = {
	baseTexture: 	{ type: "t", value: lavaTexture },
	baseSpeed:		{ type: "f", value: baseSpeed },
	repeatS:		{ type: "f", value: repeatS },
	repeatT:		{ type: "f", value: repeatT },
	noiseTexture:	{ type: "t", value: noiseTexture },
	noiseScale:		{ type: "f", value: noiseScale },
	blendTexture:	{ type: "t", value: blendTexture },
	blendSpeed: 	{ type: "f", value: blendSpeed },
	blendOffset: 	{ type: "f", value: blendOffset },
	bumpTexture:	{ type: "t", value: bumpTexture },
	bumpSpeed: 		{ type: "f", value: bumpSpeed },
	bumpScale: 		{ type: "f", value: bumpScale },
	alpha: 			{ type: "f", value: 1.0 },
	time: 			{ type: "f", value: 1.0 }
};

var customMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: customUniforms,
		vertexShader:  _sunVS,
		fragmentShader: _sunFS
	}   );

//POINTER LIGHT
var sunY = 600;
var sunX = 1;
var sunZ = 1;
var sunIntensity = 2;
let sun = new THREE.DirectionalLight(0xFFFFFF, sunIntensity);
sun.position.set(sunX,sunY,sunZ);
sun.target.position.set(0,0,0);
sun.castShadow = true;
scene.add(sun);

var ballGeometry = new THREE.SphereGeometry( 60, 64, 64 );
var ball = new THREE.Mesh(	ballGeometry, customMaterial );
//ball.position.set(sunX,sunY,sunZ);
ball.castShadow = false;
ball.receiveShadow = false;
sun.add( ball );

const helper = new THREE.DirectionalLightHelper( sun, 5 );
scene.add( helper );

//AMBIENT LIGHT
var ambientLight = new THREE.AmbientLight( 0x404040, 0.5 );
scene.add( ambientLight );

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
   customUniforms.time.value += delta;
   ball.rotation.y += 0.01;
   requestAnimationFrame( animate );
   var mesh = scene.getObjectByName("snow");
   if (mesh) {
   updateParticles();
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

	 //Collision detection for plane edges
				if (controls.getObject().position.x < -450) {
					if ( moveForward || moveBackward ) velocity.z = 100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = 100;
					if ( moveLeft || moveRight ) velocity.x = 100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = 100;
				}

				if (controls.getObject().position.x > 450) {
					if ( moveForward || moveBackward ) velocity.z = -100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = -100;
					if ( moveLeft || moveRight ) velocity.x = -100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = -100;
				}

				if (controls.getObject().position.z < -450) {
					if ( moveForward || moveBackward ) velocity.z = 100;
					if ( (moveForward && shift) || (moveBackward && shift) ) velocity.z = 100;
					if ( moveLeft || moveRight ) velocity.x = 100;
					if ( (moveLeft && shift) || (moveRight && shift) ) velocity.x = 100;
				}

				if (controls.getObject().position.z > 450) {
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

