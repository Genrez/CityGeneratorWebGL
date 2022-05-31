let composer, clock = new THREE.Clock();
let rainPass;

init();
function init() {
  composer = new EffectComposer( renderer );
  composer.addPass( new RenderPass( scene, camera ) );

  rainPass = new ShaderPass( RainShaderPass );
  rainPass.uniforms[ 'iResolution' ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );

  const params2 = {
    angle: 0.0,
    rainSpeed: 0.4,
    rainColor: '#ffffff',
    use: true,
 };

function updateU() {
    rainPass.uniforms.radian.value = params.angle / 360 * Math.PI;
    rainPass.uniforms.rainSpeed.value = params.rainSpeed;
    rainPass.uniforms.rainColor.value = new THREE.Color( params.rainColor );
}
}
updateU();
weatherSettings.add( params2, 'use', true ).onChange( function ( value ) {
    value?composer.addPass(rainPass):composer.removePass(rainPass)
} );
weatherSettings.add( params2, 'rainSpeed', 0, 1.5 ).onChange( updateU );
weatherSettings.add( params2, 'angle', 0, 360 ).onChange( updateU );
weatherSettings.addColor( params2, 'rainColor' ).onChange( updateU );
