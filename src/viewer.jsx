import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
// import { TransformControls } from 'three-transformcontrols';
// var TransformControls = require('three-transformcontrols');
// var controls = new TransformControls(camera, domElement);
// import * as THREE from 'three';
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader')
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

OBJLoader(THREE);
MTLLoader(THREE);

// var myOBJ 




function mapStateToProps(state) {
  return {
    height: state.height,
    width: state.width,
    depth: state.depth,
    colour: state.colour
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
      1000*10 // far plane
    );

    // set some distance from a cube that is located at z = 0
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 50;

      this.camera.aspect = (width/height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
    // let controls = new OrbitControls(this.camera, this.el);
    // controls.width = width;
    // controls.height = height;
    // controls.update();
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize)
      {
        renderer.setSize(width, height, false)
      }
    }

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

    // this.loadObject();
    let controls = new OrbitControls(this.camera, this.el);
    controls.width = this.el.clientWidth;
    controls.height = 500;
    controls.update();




    // objLoader.object.scale.x = this.props.height
    // objLoader.parse(object)


    // this.geometry.attributes.position.needsUpdate = true;


  }
  setControls = () => {
    // const control = new TransformControls(this.camera, this.renderer.domElement)
    // console.log(control)
    // control.addEventListener("change", this.renderer.render)
    // control.attach(this.geometry);
    // this.scene.add(control);
    // control.setMode("scale");
    // control.showX = true;
  }

  updateScale = () => {

    this.myOBJ.scale.x = this.props.width

    this.myOBJ.scale.y = this.props.height
    this.myOBJ.scale.z = this.props.depth
  }

  // loadObject = () => {

  //   // var mtlLoader = new MTLLoader();

  //   const scene = this.scene
  //   // const newProps = this.props
  //   // var myObj = this.myObj

  //   // mtlLoader.setPath('./');

  //   // mtlLoader.load('2020 Jan Kylie Dillon Bookcase.mtl', function (materials) {

  //   //   materials.preload();
  //     const objLoader = new THREE.OBJLoader()

  //     objLoader.setPath('./')



  //     objLoader.load('2020 Jan Kylie Dillon Bookcase.obj', (object) => {
  //       scene.add(object);

  //       object.scale.set(this.props.height, this.props.width, this.props.depth);
  //       object.position.set(0, 1000, 0);
  //       this.myOBJ = object;
  //       // console.log(`object:${myOBJ}`);
  //       // console.log(myOBJ.children[0])


  //   });

  loadObject = () => {

    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      // side: THREE.DoubleSide,
      flatShading: true
    });



    const scene = this.scene
    // const newProps = this.props
    // var myObj = this.myObj
    var color = new THREE.Color( 0xff0000 )

    let mtlLoader = new MTLLoader();
    // mtlLoader.setTexturePath('./2020 Jan Kylie Dillon Bookcase')
    mtlLoader.setPath('./');
    mtlLoader.load('2020 Jan Kylie Dillon Bookcase.mtl', (materials) => {
      console.log(`materials: ${materials}`)
      materials.preload();
      let objLoader = new THREE.OBJLoader()
      // objLoader.setMaterials(material);
      objLoader.setPath('./')
      objLoader.load('2020 Jan Kylie Dillon Bookcase.obj', (object) => {
        // object = object.children[0]
        scene.add(object);
        object.scale.set(this.props.height/100, this.props.width/100, this.props.depth/100);
        // object.position.set(0, 0, 0);
        this.myOBJ = object.children[0];  
        object.children[0].material.forEach((item) => 
        {
          item.color.setHex(0xadf111)  
        } );
        
        // object.color ='pink'

 
        console.log(`myOBJ:${this.myOBJ}`);
        console.log(object);
      });
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

 resizeRendererToDisplaySize = (renderer) => {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize)
    {
      renderer.setSize(width, height, false)
    }
  }

  startAnimationLoop = () => {
    
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    this.resizeRendererToDisplaySize(this.renderer);
  }



  render() {
    return (
    
    <div className="viewer" ref={ref => (this.el = ref)} />
    );
  }
}

export default connect(mapStateToProps)(Viewer)