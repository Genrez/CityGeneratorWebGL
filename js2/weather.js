let particles, rainparticles;
let positions = [], velocities = [];

var numSnowflakes = 1000;
var numRaindrops = 7500;
var maxRange = 1000, minRange = maxRange/2;
var minHeight = 150;

var geometry = new THREE.BufferGeometry();
var textureLoader = new THREE.TextureLoader();

function snowWeathers() {

addSnowflakes();
  
function addSnowflakes() {
    for(let i=0; i<numSnowflakes; i++) {
      positions.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * maxRange - minHeight),
        Math.floor(Math.random() * maxRange - minRange));
      velocities.push(
        Math.floor(Math.random() * 6-3) * 0.1,
        Math.floor(Math.random() * 5+ 0.12) * 0.18,
        Math.floor(Math.random() * 6-3) * 0.1);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

const flakeMaterial = new THREE.PointsMaterial({
  size: 5,
  map: textureLoader.load("img/snowflake.png"),
  blending: THREE.AdditiveBlending, 
  depthTest: false,
  transparent: false,
  opacity: 1,
});

particles = new THREE.Points(geometry, flakeMaterial);
particles.name = "snow";
scene.add(particles);
  
 }


function removeParticles() {
  for( var i = scene.children.length - 1; i >= 0; i--) {
    if(scene.children[i].name === "snow") {
      scene.remove(scene.children[i]);
    }
  }
  for( var i = scene.children.length - 1; i >= 0; i--) {
    if(scene.children[i].name === "rain") {
      scene.remove(scene.children[i]);
    }
  }
  positions = [];
  velocities = [];
}

function rainWeathers() {
addRaindrops();
  
function addRaindrops() {
    for(let i=0; i<numRaindrops; i++) {
      positions.push(
        Math.floor(Math.random() * maxRange - minRange),
        Math.floor(Math.random() * maxRange - minHeight),
        Math.floor(Math.random() * maxRange - minRange));
      velocities.push(
        0,
        Math.floor(Math.random() * 70-2) * 0.80,
        0);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

  const rainMaterial = new THREE.PointsMaterial({
    size: 2,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: false,
    opacity: 1.0,
    color: 0x0000ff,
  });

  rainparticles = new THREE.Points(geometry, rainMaterial);
  rainparticles.name = "rain";
  scene.add(rainparticles);
 
}

function increaseVelocity() {
  for(var i = 0; i < velocities.length; i++) {
    velocities[i] += 0.1;
  }
}

//rainWeathers();




