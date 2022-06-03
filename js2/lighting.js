//AMBIENT LIGHT
var ambientLight = new THREE.AmbientLight( 0x404040, 0.5 );
scene.add( ambientLight );

//POINTER LIGHT
var sunY = 5;
var sunX = 1;
var sunZ = 1;
var sunIntensity = 2;
let sun = new THREE.DirectionalLight(0xFFFFFF, sunIntensity);
sun.position.set(sunX,sunY,sunZ);
sun.target.position.set(0,0,0);
sun.castShadow = true;
scene.add(sun);

