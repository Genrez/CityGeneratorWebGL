function createTerrain(scene) {
    createAshphalt(scene);
    createMountains(scene);
}

function createMountains(scene) {
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
    return mountainMesh;
}

function createAshphalt(scene) {
    const cityGeometry = new THREE.PlaneGeometry(100, 100, 500, 500);

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

    for (var i = 0; i < 5; ++i) {
        for (var j = 0; j < 5; ++j) {
            const ashphaltMeshZ = createAshphaltMesh(cityGeometry, asphaltMaterial);
            ashphaltMeshZ.position.z = j * 100;
            ashphaltMeshZ.position.x = i * 100;
            scene.add(ashphaltMeshZ);

            const ashphaltMeshZNeg = createAshphaltMesh(cityGeometry, asphaltMaterial);
            ashphaltMeshZNeg.position.z = j * -100;
            ashphaltMeshZNeg.position.x = i * 100;
            scene.add(ashphaltMeshZNeg);

            const ashphaltMeshZNegX = createAshphaltMesh(cityGeometry, asphaltMaterial);
            ashphaltMeshZNegX.position.z = j * 100;
            ashphaltMeshZNegX.position.x = i * -100;
            scene.add(ashphaltMeshZNegX);

            const ashphaltMeshZNegXNeg = createAshphaltMesh(cityGeometry, asphaltMaterial);
            ashphaltMeshZNegXNeg.position.z = j * -100;
            ashphaltMeshZNegXNeg.position.x = i * -100;
            scene.add(ashphaltMeshZNegXNeg);
        }
        const ashphaltMeshX = createAshphaltMesh(cityGeometry, asphaltMaterial);
        ashphaltMeshX.position.x = i * 100;
        scene.add(ashphaltMeshX);

        const ashphaltMeshXNeg = createAshphaltMesh(cityGeometry, asphaltMaterial);
        ashphaltMeshXNeg.position.x = i * -100;
        scene.add(ashphaltMeshXNeg);
    }
}

function createAshphaltMesh(cityGeometry, asphaltMaterial) {
    ashphaltMesh = new THREE.Mesh(cityGeometry, asphaltMaterial);
    ashphaltMesh.rotation.x = -Math.PI / 2;
    return ashphaltMesh;
}

function generateBuildings(scene) {
    
}