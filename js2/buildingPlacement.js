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

    const testBox = new THREE.Mesh(
        new THREE.PlaneGeometry(36, 36),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
        })
    )

    // testBox.rotateX(-Math.PI / 2);
    // testBox.position.set(0, 1, 0);
    // scene.add(testBox);

    testBox.rotateX(-Math.PI / 2);
    testBox.position.set(108, 1, -108);
    scene.add(testBox);
}

generateGrid();