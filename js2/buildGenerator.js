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

function generateCity(spaceBetweenBuildings, buildingScale) {
  
    for (var i = spaceBetweenBuildings; i < AsphaltX/2-10; i += spaceBetweenBuildings) {
        for (var j = spaceBetweenBuildings; j < AsphaltZ/2-10; j += spaceBetweenBuildings) {
            generateBuilding(i, j, buildingScale);
        }
    }

    for (var i = spaceBetweenBuildings; i < AsphaltX/2-10; i += spaceBetweenBuildings) {
        for (var j = 0; j > -AsphaltZ/2+10; j -= spaceBetweenBuildings) {
            generateBuilding(i, j, buildingScale);
        }
    }
    
    for (var i = 0; i > -AsphaltX/2+10; i -= spaceBetweenBuildings) {
        for (var j = spaceBetweenBuildings; j > -AsphaltZ/2+10; j -= spaceBetweenBuildings) {
            generateBuilding(i, j, buildingScale);
        }
    }
  
    for (var i = 0; i > -AsphaltX/2+10; i -= spaceBetweenBuildings) {
        for (var j = 144; j < AsphaltZ/2-10; j += spaceBetweenBuildings) {
            generateBuilding(i, j, buildingScale);
        }
    }
    
    
}


function generateBuilding(i, j, buildingScale) {
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
        mesh.scale.set(5, 5, Math.floor(Math.random() * 20)+ buildingScale);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        mesh.name = "loaded_mesh";
        scene.add(mesh);
    });
}

function getRandomColor() {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
  }

function clearCity() {
    var meshes = scene.children;
    for (var j = 0; j < 10; ++j) {
        for (var i = 0; i < meshes.length; i++) {
            if (meshes[i].name == "loaded_mesh") {
                scene.remove(meshes[i]);
            }
        }
    }
}

var amount = 0;
function clearNumber() {
    for (var i = 0; i < amount.length; i++) {
        if (meshes[i].name == "loaded_mesh") {
            scene.remove(meshes[i]);
        }
    }
}





