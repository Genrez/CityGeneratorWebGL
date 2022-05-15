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

    const grid = new THREE.GridHelper(450, 25);
    grid.scale.setScalar(2);
    grid.position.y = 1;
    scene.add(grid);

    const buildings = [];

    for (var i = 0; i < 360; i += 36) {
        for (var j = 0; j < 360; j += 36) {
            const buildingExists = buildings.find(function(building) {
                return (building.position.x === i) 
                && (building.position.z === j)
            })

            if (!buildingExists) {
                const building = generateBuilding(i, j);
                buildings.push(building);
            }
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
    return testBox;
}

generateGrid();