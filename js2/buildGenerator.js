var numberOfBuildings = 100;

function generateBuilding(number, x, z) {
    var loader = new THREE.PLYLoader();
    var mesh = null;
    loader.load('models/Building' + number + '.ply', function (geometry) {
        var material = new THREE.MeshPhongMaterial();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        mesh = new THREE.Mesh(geometry, material);
        mesh.name = "building";

        mesh.position.x = x;
        mesh.position.z = z;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
    });
}

function generateBase() {
    for (var i = 0; i < numberOfBuildings; i++) {
        generateBuilding(Math.random(1,5), Math.random(0, 1000), Math.random(0, 1000));
    }
}

generateBase();




