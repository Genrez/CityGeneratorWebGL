createAshphalt();
createMountains();

function createMountains() {
    const mountainGeometry = new THREE.PlaneGeometry(900,900, 500, 500);

    let mountainDisplacementMap = new THREE.TextureLoader()
    .load("heightmap/heightmap.png");

    let mountainTexture = new THREE.TextureLoader()
    .load("terrain/rock-texture.jpg");

    const mountainMaterial = new THREE.MeshStandardMaterial({
        color: 'grey',
        map: mountainTexture,
        displacementMap: mountainDisplacementMap,
        displacementScale: 70,
    })

    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, 0));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, 0));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 0, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 0, -900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, -900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, 900, 900));
    scene.add(createMountain(mountainGeometry, mountainMaterial, -900, -900));
}

function createMountain(mountainGeometry, mountainMaterial, x, z) {
    const mountainMesh = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountainMesh.rotation.x = -Math.PI / 2;
    mountainMesh.position.x = x;
    mountainMesh.position.z = z;
    mountainMesh.position.y = 0.5;
    return mountainMesh;
}

function createAshphalt() {
    const cityGeometry = new THREE.PlaneGeometry(2000, 2000, 500, 500);

    let asphaltDisplacementMap = new THREE.TextureLoader()
    .load("heightmap/asphalt-displacement.png");

    let asphaltTexture = new THREE.TextureLoader()
    .load("terrain/asphalt-texture.jpg");

    const asphaltMaterial = new THREE.MeshStandardMaterial({
        color: 'grey',
        map: asphaltTexture,
        displacementMap: asphaltDisplacementMap,
        displacementScale: 1,
    })

    const ashphaltMeshZ = createAshphaltMesh(cityGeometry, asphaltMaterial);
    ashphaltMeshZ.position.z = 0;
    ashphaltMeshZ.position.x = 0
    scene.add(ashphaltMeshZ);
}

function createAshphaltMesh(cityGeometry, asphaltMaterial) {
    ashphaltMesh = new THREE.Mesh(cityGeometry, asphaltMaterial);
    ashphaltMesh.rotation.x = -Math.PI / 2;
    return ashphaltMesh;
}

