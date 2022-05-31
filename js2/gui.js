var gui = new dat.GUI({
    name: "HUD"
});
 
var params = {
    skyBoxRotation: 0.001,

    sunX: 2,
    sunY: 600,
    sunZ: 2,
    sunIntensity: 1,

    generate: function () {
        generateCity();
    },

    clear: function () {
        clearCity();
    },

    sky1: function () { 
        skybox.material = materialArray;
    },
    sky2: function () {
        skybox.material = materialArray2;
    },
    sky3: function () {
        skybox.material = materialArray3;
    },
    sky4: function () {
        skybox.material = materialArray4;
    },
}

var cameraSettings = gui.addFolder('Camera Settings');

var weatherSettings = gui.addFolder('Weather Settings');

var generationSettings = gui.addFolder('Generation Settings');

var generation = generationSettings.add(params, 'generate');
generation.name("Generate");

var clear = generationSettings.add(params, 'clear');
clear.name("Clear");

var lightSettings = gui.addFolder('Light Settings');

lightSettings.add(params, 'sunY', 0, 1000).onChange(function (value) {
    sun.position.y = value;
});

lightSettings.add(params, 'sunZ', 0, 100).onChange(function (value) {
    sun.position.z = value;
});

lightSettings.add(params, 'sunX', 0, 100).onChange(function (value) {
    sun.position.x = value;
});

lightSettings.add(params, 'sunIntensity', 0, 10).onChange(function (value) {
    sun.intensity = value;
});

var skySettings = gui.addFolder('Sky Settings');

skySettings.add(params, 'skyBoxRotation', 0.001, 0.10).onChange(function (value) {
    skyBoxRotation = value;
});

var skyB1 = skySettings.add(params, 'sky1');
skyB1.name("1");

var skyB2 = skySettings.add(params, 'sky2');
skyB2.name("2");

var skyB3 = skySettings.add(params, 'sky3');
skyB3.name("3");

var skyB4 = skySettings.add(params, 'sky4');
skyB4.name("4");

var planeSettings = gui.addFolder('Plane Settings');





