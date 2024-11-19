import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let project = document.querySelector("#building1");
let projectSlide = document.getElementById("container");
let resetButton = document.getElementById("header");

var container = document.getElementById( 'scene' );


// a scene

var scene = new THREE.Scene();
    scene.background = new THREE.Color( 'rgba(15, 23, 42, 0.95)' );


// camera that uses the container's size

var camera = new THREE.PerspectiveCamera( 20, container.clientWidth/ container.clientHeight );
    camera.position.set( 2, 5, 10 );
    camera.lookAt( scene.position );


// renderer that uses the container's size and is inserted in it

var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setAnimationLoop( animationLoop );
    container.appendChild( renderer.domElement );


// various stuff, not interesting

var controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;

var ambientLight = new THREE.AmbientLight( 'white', 0.5 );
    scene.add( ambientLight );

var light = new THREE.DirectionalLight( 'white', 0.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );


let material = new THREE.MeshPhongMaterial( {color:'white', shininess: 10} );

let loader = new OBJLoader();

loader.load( 'apartment.obj',
    function( obj ){
        obj.scale.setScalar(.03);
        obj.position.set(2.35, -.5, 1); 
        scene.add( obj );
    },
    function( xhr ){
        console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function( err ){
        console.error( "Error loading 'apartment.obj'")
    }
);

function animationLoop()
{

    controls.update( );
		light.position.copy( camera.position );
    renderer.render( scene, camera );
}

project.onclick = display;

resetButton.onclick = reset;

function display() {
    projectSlide.style.display = "flex";
};

function reset() {
    projectSlide.style.display = "none";
};