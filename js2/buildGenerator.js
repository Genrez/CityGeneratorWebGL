var buildings = [];
var numberOfBuildings = 100;

function generateBuilding(number) {
    var loader = new THREE.PLYLoader();
    var mesh = null;
    loader.load('models/Building' + number + '.ply', function (geometry) {
        var material = new THREE.MeshPhongMaterial();
        geometry.computeVertexNormals();
        mesh = new THREE.Mesh(geometry, material);
        mesh.name = "building";
        geometry.computeBoundingBox();
        var size = geometry.boundingBox.getSize();
        var sca = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        combined.multiply(sca);
        mesh.applyMatrix(combined);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });
}

function generateBase() {

}

generateBuilding(1);




