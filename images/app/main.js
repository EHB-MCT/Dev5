import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function threejs(){
    //add scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000 );
    scene.add( camera );

    //init WebGL renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //add lighting
    const light = new THREE.AmbientLight( 0x404040, 100 ); // soft white light
    scene.add( light );

    const loader = new GLTFLoader();
    let agentModel;

    //load gltf files
    loader.load( 'assets/agents/Breach.glb', function ( gltf ) {
        agentModel = gltf;
        scene.add( gltf.scene );
        gltf.scene.position.set(0, -0.2, -0.5);
        gltf.scene.scale.set(0.2, 0.2, 0.2)

        animate();
    },undefined, 
    function ( error ) {
        console.error( error );
    } );

    //anim loop to display scene
    function animate() {
        requestAnimationFrame( animate );
        agentModel.scene.rotation.y -= 0.01;
        renderer.render( scene, camera );
    }
}

threejs();

