import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import * as THREE from 'three';
// var THREE = require('three');

// var container;

// var camera, controls, scene, renderer;
// var lighting, ambient, keyLight, fillLight, backLight;
// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;

function mapStateToProps(state) {
  return {
    height: state.height,
    width: state.width,
    depth: state.depth
  }
}

// const ReactSlider = ({ value, defaultValue, min, max, step, onChange }) => (
//   <input
//     type="range"
//     defaultValue={defaultValue}
//     min={min}
//     max={max}
//     value={value}
//     step={step}
//     onChange={onChange}
//   />
// )



class MainView extends React.Component {
  //  const el = React.createRef

  // constructor(props) {
  //   super(props);
  //   this.el = React.createRef
  // }

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjets();
    this.startAnimationLoop();
  }
 
  sceneSetup = () => {
    const width = this.innerWidth;
    const height = this.innerHeight;
    // const width = 500;
    // const height = 500;


    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref

  }


  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(- 100, - 200, - 100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

  }

  startAnimationLoop = () => {
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

  }



  render() {

    return (

      <div ref={ref => (this.mount = ref)} />       
      // <div ref={this.el} />


    );
  }

}

export default connect(mapStateToProps)(MainView);




// state = {
  //   height: 2,
  //   width: 1,
  //   depth: 1,
  // }

  // sendToStore = (height) => {
  //   this.props.dispatch({ type: "UPDATE_HEIGHT", newHeight: height })
  // }


  // increase = () => {
  //   this.props.sendTStore (this.props.height + 1 );
  //     // {
  //     //   a: this.state.a + 1
  //     // })
  // }

  // adjustHeight = (event) => {
  //   this.sendToStore(event.target.value)


  // }

  // sceneView = () => {
  //   var scene = new THREE.Scene();
  //   var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   var renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild( renderer.domElement );
  //   // this.mount.appendChild(renderer.domElement)
  //   var geometry = new THREE.BoxGeometry(this.props.height, this.props.width, this.props.depth);
  //   var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   var cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);
  //   camera.position.z = 5;
  //   var animate = function () {
  //     requestAnimationFrame(animate);
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //   };
  //   animate();
    //  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    //     camera.position.x = 999;
    //     camera.position.y = 9;
    //     camera.position.z = 9;
    //   //   function init2() {
    //   //   container = document.createElement('div');
    //   //   document.body.appendChild(container);

    //   //   //
    //     scene = new THREE.Scene();
    //     ambient = new THREE.AmbientLight(0xffffff, 2.0);
    //     scene.add(ambient);
    //   //   //
    //     keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    //     keyLight.position.set(-100, 0, 100);

    //     fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    //     fillLight.position.set(100, 0, 100);

    //     backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    //     backLight.position.set(100, 0, -100).normalize();

    //     var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    //     scene.add(directionalLight);

    //     scene.add(keyLight);
    //     scene.add(fillLight);
    //     scene.add(backLight);
    //     scene.add(new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ));

    //   // }

    //   renderer = new THREE.WebGLRenderer();
    //   renderer.setPixelRatio(window.devicePixelRatio);
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

    // container.appendChild(renderer.domElement);

    // function render2() {
    //   requestAnimationFrame(render);
    //     controls.update();
    //     renderer.render2(scene, camera);
    //     // Code...
    // }
    // function animate() {
    // 	requestAnimationFrame( animate );
    // 	renderer.render2( scene, camera );
    // }
  // }
  // componentDidUpdate() {
  //   this.sceneView();

  // }