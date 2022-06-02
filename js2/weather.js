let particles;
let positions = [], velocities = [];

var numSnowflakes = 1000;
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
  size: 4,
  map: textureLoader.load("img/snowflake.png"),
  blending: THREE.AdditiveBlending, 
  depthTest: false,
  transparent: false,
  opacity: 0.7,
});

particles = new THREE.Points(geometry, flakeMaterial);
particles.name = "snow";
scene.add(particles);
}

function removeParticles() {
  scene.remove(particles);
}
