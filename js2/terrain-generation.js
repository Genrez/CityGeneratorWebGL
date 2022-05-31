var AsphaltX = 900;
var AsphaltZ = 900;
var displacementValue = 70;


createAshphalt();
createMountains();
function createMountains() {
    var mountainGeometry = new THREE.PlaneGeometry(900,900, 500, 500);
    var mesh = scene.getObjectByName("Mountain");

    let mountainDisplacementMap = new THREE.TextureLoader()
    .load("heightmap/heightmap.png");

    let mountainTexture = new THREE.TextureLoader()
    .load("terrain/rock-texture.jpg");

    var mountainMaterial = new THREE.MeshStandardMaterial({
        color: 'grey',
        map: mountainTexture,
        displacementMap: mountainDisplacementMap,
        displacementScale: displacementValue,
    })
   
    if (!mesh) {
    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, 0));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, 0));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 0, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 0, -900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, -900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, -900));
    }
}

function createMountain(mountainGeometry, mountainMaterial, x, z) {
    var mountainMesh = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountainMesh.name = "Mountain";
    mountainMesh.rotation.x = -Math.PI / 2;
    mountainMesh.position.x = x;
    mountainMesh.position.z = z;
    mountainMesh.position.y = 0.5;
    return mountainMesh;
}

function createAshphalt() {
    var cityGeometry = new THREE.PlaneGeometry(900, 900, 500, 500);

    let asphaltDisplacementMap = new THREE.TextureLoader()
    .load("heightmap/asphalt-displacement.png");

    let asphaltTexture = new THREE.TextureLoader()
    .load("terrain/asphalt-texture.jpg");

    var asphaltMaterial = new THREE.MeshStandardMaterial({
        color: 'grey',
        map: asphaltTexture,
        displacementMap: asphaltDisplacementMap,
        displacementScale: 1,
    })

    var ashphaltMeshZ = createAshphaltMesh(cityGeometry, asphaltMaterial);
    ashphaltMeshZ.position.z = 0;
    ashphaltMeshZ.position.x = 0;
    ashphaltMeshZ.name = "Asphalt";

    var mesh = scene.getObjectByName("Asphalt");
    if (!mesh) {
    scene.add(ashphaltMeshZ);
    }
}

function createAshphaltMesh(cityGeometry, asphaltMaterial) {
    ashphaltMesh = new THREE.Mesh(cityGeometry, asphaltMaterial);
    ashphaltMesh.rotation.x = -Math.PI / 2;
    return ashphaltMesh;
}

function clearAsphalt() {
    var mesh = scene.getObjectByName("Asphalt");
    if (mesh) {
        scene.remove(mesh);
    }
}

function clearMountains() {
    var mesh = scene.getObjectByName("Mountain");
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        mesh = scene.children[i];
        if (mesh.name == "Mountain") {
        scene.remove(mesh);

    }
  }
}

