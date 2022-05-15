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

function generateCity() {
    const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(900, 900),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            visible: false
        })
    )

    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.position.y = 1;
    scene.add(planeMesh);

    for (var i = 72; i < 432; i += 72) {
        for (var j = 72; j < 432; j += 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 72; i < 432; i += 72) {
        for (var j = 72; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 72; i > -432; i -= 72) {
        for (var j = 72; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 72; i > -432; i -= 72) {
        for (var j = 72; j < 432; j += 72) {
            generateBuilding(i, j);
        }
    }
}


function generateBuilding(i, j) {
    var model = Math.floor(Math.random() * 5) + 1;
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    loader.load('models/Building' + model + '.ply', function (geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        const material = new THREE.MeshStandardMaterial( { color: getRandomColor(), flatShading: true } );
        const mesh = new THREE.Mesh( geometry, material );
        
        mesh.position.x = i;
        mesh.position.z = j;

        //mesh.rotation.y = Math.random() * Math.PI / 2;
        
        mesh.rotation.x = - Math.PI / 2;
        mesh.scale.multiplyScalar( 6 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

generateCity()





