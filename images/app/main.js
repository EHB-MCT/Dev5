import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let selectedAgent;

//Three.js
//Creates threejs canvas and loads in a model
function threejs(){

    //add scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000 );
    scene.add( camera );

    //init WebGL renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.domElement.id = "canvas";

    //add lighting
    const light = new THREE.AmbientLight( 0x404040, 100 );
    scene.add( light );

    //Init GLTFloader for importing models
    const loader = new GLTFLoader();
    let agentModel;

    //Load gltf files
    loader.load( `../assets/agents/${selectedAgent}.glb`, function ( gltf ) {
        agentModel = gltf;
        scene.add( gltf.scene );
        gltf.scene.position.set(0, -0.2, -0.5);
        gltf.scene.scale.set(0.2, 0.2, 0.2)

        animate();
    },undefined, 
    function ( error ) {
        console.error( error );
    } );

    //Anim loop to display scene
    function animate() {
        requestAnimationFrame( animate );
        agentModel.scene.rotation.y -= 0.01;
        renderer.render( scene, camera );
    }
}

//clears the canvas before loading in a new model
function clearCanvas(){
  const canvasElement = document.getElementById("canvas");

  //Checks if canvas is created
  if(canvasElement){

    //removes current canvas
    canvasElement.remove();
    threejs();
  } else {
    threejs();
  }
}

//Fetches the agents from the valorant api and displays the icons
async function getValorantAgents() {

  //Fetch valorant api
  const response = await fetch("https://valorant-api.com/v1/agents");
  const data = await response.json();
  const agents = data.data.filter(agent => agent.isPlayableCharacter);

  //Get the target container
  const agentIconsContainer = document.getElementById("agentIcons");

  //Loops over the data and displays the agent icons
  agents.forEach(agent => {
    agentIconsContainer.insertAdjacentHTML("afterbegin", 
      `<div class="icon" id="${agent.displayName}-icon">
        <img src="${agent.displayIcon}" alt="">
      </div>`);

    //Create icon const to save the selected agent
    const icon = document.getElementById(`${agent.displayName}-icon`);

    //Listens for selected agent and loads in in through the clearCanvas fun
    icon.addEventListener("click", () => {
      selectedAgent = agent.displayName;
      clearCanvas();
    });
  });
}

getValorantAgents();


