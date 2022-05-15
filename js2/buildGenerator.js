var numberOfBuildings = 20;
var loader = new THREE.PLYLoader();

loader.load( './models/dolphins.ply', function ( geometry ) {
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    const material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.y = 1.5;
    mesh.position.z = 4;
    mesh.rotation.x = - Math.PI / 2;
    mesh.scale.multiplyScalar( 0.007 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.name = "loaded_mesh";
    scene.add( mesh );

} );


function generateBuilding(number) {
    loader.load('models/Building' + number + '.ply', function (geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        const material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
        const mesh = new THREE.Mesh( geometry, material );
        
        mesh.position.x = 40;

        mesh.rotation.x = - Math.PI / 2;
        mesh.scale.multiplyScalar( 4 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
    });
}

//function generateBase() {
//    for (var i = 0; i < numberOfBuildings; i++) {
 //       generateBuilding(Math.random(1,5), Math.random(0, 1000), Math.random(0, 1000));
 //   }
//}
var model = 5;
generateBuilding(model);





