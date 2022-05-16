function generateGrid() {
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

    for (var i = 0; i < 432; i += 72) {
        for (var j = 0; j < 432; j += 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 0; i < 432; i += 72) {
        for (var j = 0; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 0; i > -432; i -= 72) {
        for (var j = 0; j > -432; j -= 72) {
            generateBuilding(i, j);
        }
    }

    for (var i = 0; i > -432; i -= 72) {
        for (var j = 0; j < 432; j += 72) {
            generateBuilding(i, j);
        }
    }
}

function generateBuilding(x, z) {
    const testBox = new THREE.Mesh(
        new THREE.PlaneGeometry(36, 36),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
        })
    )

    testBox.rotateX(-Math.PI / 2);
    testBox.position.set(x, 1, z);
    scene.add(testBox);
}

generateGrid();