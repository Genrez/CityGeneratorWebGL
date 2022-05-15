var gui = new dat.GUI({
    name: "HUD"
});
 
var params = {
    skyboxRotation: 0,

    sunX: 2,
    sunY: 300,
    sunZ: 2,
    sunIntensity: 1,

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

var generationSettings = gui.addFolder('Generation Settings');

var lightSettings = gui.addFolder('Light Settings');
//change sun y position
lightSettings.add(params, 'sunY', 0, 1000).onChange(function (value) {
    sun.position.y = value;
});
//change sun intensity from 0 to 1
lightSettings.add(params, 'sunIntensity', 0, 1).onChange(function (value) {
    sun.intensity = value;
});


var skySettings = gui.addFolder('Sky Settings');


var skyRotationControl = skySettings.add(params, 'skyboxRotation', 0, 10, 0.1).listen();;
skyRotationControl.name("Sky Rotation Speed");
skyRotationControl.onChange(function (val) {
    params.skyboxRotation = val;
});

var skyB1 = skySettings.add(params, 'sky1');
skyB1.name("1");

var skyB2 = skySettings.add(params, 'sky2');
skyB2.name("2");

var skyB3 = skySettings.add(params, 'sky3');
skyB3.name("3");

var skyB4 = skySettings.add(params, 'sky4');
skyB4.name("4");





