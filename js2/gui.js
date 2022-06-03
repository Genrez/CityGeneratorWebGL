var gui = new dat.GUI({
    name: "HUD"
});

var params = {
    skyBoxRotation: 0.001,

    sunX: 2,
    sunY: 600,
    sunZ: 2,
    sunIntensity: 1,

    numSnowflakes: 1000,
    numRaindrops: 7500,
    
    snowWeather: function() {
        removeParticles();
        snowWeathers();
    },

    rainWeather: function() {
        removeParticles();
        rainWeathers();
    },

    deleteWeather: function() {
        removeParticles();
    },

    generate: function () {
        generateCity();
    },

    clear: function () {
        clearCity();
    },

    addGround: function () {
        createAshphalt();
    },

    clearGround: function () {
        clearAsphalt(); 
    },

    addMountain: function () {
        createMountains();
    },

    clearMountain: function () {
        clearMountains();
    },

    //amount: 0,

    //amountToRemove: function () {
    //    clearNumber();
   // },

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

    mountainDisplacement: 70,
}

var cameraSettings = gui.addFolder('Camera Settings');

var weatherSettings = gui.addFolder('Weather Settings');
var snowWeather = weatherSettings.add(params, 'snowWeather');
snowWeather.name("Add Snow Weather");
weatherSettings.add(params, 'numSnowflakes', 0, 2500).onChange(function (value) {
    numSnowflakes = value;
});

var rainWeather = weatherSettings.add(params, 'rainWeather');
rainWeather.name("Add Rain Weather");
weatherSettings.add(params, 'numRaindrops', 0, 10000).onChange(function (value) {
    numRaindrops = value;
});

var deleteWeather = weatherSettings.add(params, 'deleteWeather');
deleteWeather.name("Delete Weather");



var generationSettings = gui.addFolder('Generation Settings');

var generation = generationSettings.add(params, 'generate');
generation.name("Generate");

var clear = generationSettings.add(params, 'clear');
clear.name("Clear City");

var addGround = generationSettings.add(params, 'addGround');
addGround.name("Add Ground");

var clearGround = generationSettings.add(params, 'clearGround');
clearGround.name("Clear Ground");

var addMountain  = generationSettings.add(params, 'addMountain');
addMountain.name("Add Mountains");

var clearMountain = generationSettings.add(params, 'clearMountain');
clearMountain.name("Clear Mountains");

//var clearAmount = generationSettings.add(params, 'amountToRemove');
//clearAmount.name("ClearAmount");
//generationSettings.add(params, 'amount', 0, 100).onChange(function (value) {
//    amount = value;
//});

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
planeSettings.add(params, 'displacementValue', 0, 200).onChange(function (value) {
    mountainDisplacement = value;
});





