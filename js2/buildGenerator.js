var numberOfBuildings = 20;
var loader = new THREE.PLYLoader();

/*
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
*/

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
        for (var j = 0; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }
    
    for (var i = 0; i > -432; i -= 72) {
        for (var j = 72; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }
   
    for (var i = 144; i > -432; i -= 72) {
        for (var j = 144; j < 432; j += 72) {
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

        //const material = new THREE.MeshStandardMaterial( { color: getRandomColor(), flatShading: true } );
       
        const material = new THREE.MeshLambertMaterial( { color: getRandomColor(), flatShading: false } );
        const mesh = new THREE.Mesh( geometry, material );
        
        mesh.position.x = i;
        mesh.position.z = j;
        
        //mesh.rotation.y = Math.random() * Math.PI / 2;
        mesh.rotation.z = Math.floor(Math.random() * 360);
        
        mesh.rotation.x = - Math.PI / 2;
        mesh.scale.set(5, 5, Math.floor(Math.random() * 20)+10);
       // mesh.scale.y = Math.random() * 6 + 1;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        mesh.name = "loaded_mesh";
        scene.add(mesh);
    });
}

//Get random colour thats not dark
function getRandomColor() {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
  }

generateCity()





