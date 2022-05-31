import * as THREE from '../build/three.module.js';
// source from https://www.shadertoy.com/view/wd2GDG
const RainShaderPass = {
    uniforms: {

        'tDiffuse': { value: null },
        'iResolution': { value: null },
        'iTime': { value: 0 },
        'radian': { value: 0 },
        'rainSpeed': { value: 0.4 },
        'rainColor': { value: new THREE.Color( 1, 1, 1 ) }
    },

    vertexShader: /* glsl */`

        varying highp vec2 vUv;

            void main() {

                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }`,

    fragmentShader: /* glsl */`

        uniform sampler2D tDiffuse;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform float radian;
        uniform float rainSpeed;
        uniform vec3 rainColor;
        varying highp vec2 vUv;

        float random(float t){
           return fract(sin(t*745.523)*7894.552);
        }
        

        void main(){
            vec3 col=texture(tDiffuse,vUv).rgb;
            vec2 uv = gl_FragCoord.xy/iResolution.xy;
            mat2 r=mat2(cos(radian),-sin(radian),sin(radian),cos(radian));
            uv*=r;
            uv.y += iTime*4.0*rainSpeed;
            uv.xy *= 100.0;
            uv.y += random(floor(uv.x))*100.0;
            vec3 rain=vec3(clamp(1.0-length(vec2(cos(uv.x*3.1415 ), sin(uv.y*0.2)-1.7)), 0.0,1.0))*rainColor;
            gl_FragColor = vec4(col+rain,1.0);
        }`

};
export { RainShaderPass };