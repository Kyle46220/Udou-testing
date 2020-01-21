import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
// import { TransformControls } from 'three-transformcontrols';
var TransformControls = require('three-transformcontrols');
// var controls = new TransformControls(camera, domElement);
// import * as THREE from 'three';
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader')

var THREE = require('three');

OBJLoader(THREE);
MTLLoader(THREE);




function mapStateToProps(state) {
  return {
    height: state.height,
    width: state.width,
    depth: state.depth
  }
}

class Viewer extends React.Component {

  componentDidMount() {

    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    this.setControls();
  }

  componentDidUpdate() {
    
    this.updateScale()
    
  }

  sceneSetup = () => {
    const width = this.el.clientWidth;
    const height = 500;

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
    const geometry = new THREE.BoxGeometry(this.props.height, this.props.width, this.props.depth);
    
    console.log(this.props.height)
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    console.log(`The scale is: ${this.cube.scale}`)

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

    // this.geometry.attributes.position.needsUpdate = true;
    
    
  }
  setControls = () =>
  {
    const control = new TransformControls(this.camera, this.renderer.domElement)
    console.log(control)
    control.addEventListener("change", this.renderer.render)
    control.attach(this.geometry);
    this.scene.add(control);
    control.setMode("scale");
    control.showX = true;
  }

  updateScale = () =>
  {
    
    this.cube.scale.x = this.props.height
    
    this.cube.scale.y = this.props.depth
    this.cube.scale.z = this.props.width
  }

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

  }



  render() {
    return (<div className="viewer" ref={ref => (this.el = ref)} />);
  }
}

export default Viewer