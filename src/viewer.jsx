import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

OBJLoader(THREE);
MTLLoader(THREE);

function mapStateToProps(state) {
	return {
		height: state.height,
		width: state.width,
		depth: state.depth,
		colour: state.colour,
		test: state.test
	};
}

class Viewer extends React.Component {
	componentDidMount() {
		this.sceneSetup();
		this.addCustomSceneObjects();
		this.startAnimationLoop();

		this.loadObject();
	}

	componentDidUpdate() {
		this.updateScale();
	}

	sceneSetup = () => {
		const width = this.el.clientWidth;
		const height = 500;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			75, // fov = field of view
			width / height, // aspect ratio
			0.1, // near plane
			1000 * 10 // far plane
		);

		// set some distance from a cube that is located at z = 0
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 50;

		this.camera.aspect = width / height;
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(width, height);
		this.el.appendChild(this.renderer.domElement);
		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;

			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const needResize =
				canvas.width !== width || canvas.height !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
		}
	};

	addCustomSceneObjects = () => {
		const geometry = new THREE.BoxGeometry(
			this.props.height,
			this.props.width,
			this.props.depth
		);

		console.log(this.props.height);
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
		lights[2].position.set(-1000, -2000, -1000);

		this.scene.add(lights[0]);
		this.scene.add(lights[1]);
		this.scene.add(lights[2]);

		// this.loadObject();
		let controls = new OrbitControls(this.camera, this.el);
		controls.width = this.el.clientWidth;
		controls.height = 500;
		controls.update();
	};

	updateScale = () => {
		this.myOBJ.children[10].geometry.rotateY = this.props.test * 10;
		console.log(this.myOBJ.children[8].geometry);
		this.myOBJ.scale.x = this.props.width / 100;
		this.myOBJ.scale.y = this.props.height / 100;
		this.myOBJ.scale.z = this.props.depth / 100;

		switch (this.props.colour) {
			case 'Natural':
				this.colourValue = 0xabc123;
				break;

			case 'Black':
				this.colourValue = 0xffd537;

				break;
			case 'White':
				this.colourValue = 0xa6a6a6;

				break;
			default:
				this.colourValue = 0xa6a6a6;
		}
	};

	loadObject = () => {
		const material = new THREE.MeshPhongMaterial({
			color: 0x156289,
			emissive: 0x072534,

			flatShading: true
		});

		const scene = this.scene;

		var color = new THREE.Color(0xff0000);

		let mtlLoader = new MTLLoader();

		mtlLoader.setPath('./');
		mtlLoader.load('cabinetTest1.mtl', materials => {
			console.log(`materials: ${materials}`);
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			// objLoader.setMaterials(material);
			objLoader.setPath('./');
			objLoader.load('cabinetTest1.obj', object => {
				// object = object.children[0]
				console.log(object);
				this.myOBJ = object;
				// this.myOBJ.children[8].rotateX = 50;

				scene.add(object);
				object.scale.set(
					this.props.height / 100,
					this.props.width / 100,
					this.props.depth / 100
				);

				this.myOBJ.children[8].geometry.scale.x = 50;

				console.log(this.props.height);

				console.log(`myOBJ:${this.myOBJ}`);
				console.log(object);
			});
		});
	};

	resizeRendererToDisplaySize = renderer => {
		const canvas = this.renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
	};

	startAnimationLoop = () => {
		this.renderer.render(this.scene, this.camera);
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
		this.resizeRendererToDisplaySize(this.renderer);
	};

	render() {
		return <div className="viewer" ref={ref => (this.el = ref)} />;
	}
}

export default connect(mapStateToProps)(Viewer);
