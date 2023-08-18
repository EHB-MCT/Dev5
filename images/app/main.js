import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000 );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0x404040, 100 ); // soft white light
scene.add( light );

const loader = new GLTFLoader();
let agentModel;

loader.load( 'assets/deadlock/Deadlock.glb', function ( gltf ) {
    agentModel = gltf;
	scene.add( gltf.scene );
    gltf.scene.rotation.y = 0;

    gltf.scene.position.y = -0.2;
    gltf.scene.position.x = 0;
    gltf.scene.position.z = -0.5;

    gltf.scene.scale.set(0.2, 0.2, 0.2)
},
function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
function ( error ) {
	console.error( error );
} );

function animate() {
	requestAnimationFrame( animate );
    agentModel.scene.rotation.y += 0.02;
	renderer.render( scene, camera );
}

animate();
