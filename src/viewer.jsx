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

// var myOBJ 




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
    // this.setControls();
    this.loadObject();
  }

  componentDidUpdate() {

    this.updateScale()
    // this.loadObject()

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
    this.camera.position.z = 2000;
    // this.camera.position.y = 2500;
    // this.camera.position.z = 2000;


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
    // this.scene.add(this.cube);
    console.log(`The scale is: ${this.cube.scale}`)

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 2000, 0);
    lights[1].position.set(1000, 2000, 1000);
    lights[2].position.set(- 1000, - 2000, - 1000);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    this.loadObject();




    // objLoader.object.scale.x = this.props.height
    // objLoader.parse(object)


    // this.geometry.attributes.position.needsUpdate = true;


  }
  setControls = () => {
    const control = new TransformControls(this.camera, this.renderer.domElement)
    console.log(control)
    control.addEventListener("change", this.renderer.render)
    control.attach(this.geometry);
    this.scene.add(control);
    control.setMode("scale");
    control.showX = true;
  }

  updateScale = () => {


    this.myOBJ.scale.x = this.props.height

    this.myOBJ.scale.y = this.props.depth
    this.myOBJ.scale.z = this.props.width
  }

  loadObject = () => {

    // var mtlLoader = new MTLLoader();

    const scene = this.scene
    // const newProps = this.props
    // var myObj = this.myObj
    
    // mtlLoader.setPath('./');

    // mtlLoader.load('2020 Jan Kylie Dillon Bookcase.mtl', function (materials) {

    //   materials.preload();
      const objLoader = new THREE.OBJLoader()

      objLoader.setPath('./')

      

      objLoader.load('2020 Jan Kylie Dillon Bookcase.obj', (object) => {
        scene.add(object);

        object.scale.set(this.props.height, this.props.width, this.props.depth);
        object.position.set(0, 1000, 0);
        this.myOBJ = object;
        // console.log(`object:${myOBJ}`);
        // console.log(myOBJ.children[0])
      

    });






      //   var objLoader = new THREE.OBJLoader();
      //   // objLoader.setMaterials(materials);
      //   objLoader.setPath('../src');
      //   objLoader.load('./2020 Jan Kylie Dillon Bookcase.obj', function (object) {

      //     scene.add(object);
      //     object.scale.set(2, .5, .5);

      //   });

      // // });

      // const objLoader = new THREE.OBJLoader()
      // objLoader.load( './src/2020 Jan Kylie Dillon Bookcase.obj', (object) =>
      // {
      //   scene.add(object);
      //   console.log(`object:${object}`);
      //   object.scale.set(2, .5, .5)
      // });
    }



  startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

      }



  render() {
      return(<div className = "viewer" ref = { ref => (this.el = ref)} />);
  }
}

export default Viewer