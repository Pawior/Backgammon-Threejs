import { sleep } from "./utils.js";
import Board from "./models/Board.js";
import Checker from "./models/Checker.js";

class Models {
  constructor() {
    this.sceneColor = 0x4b7979;
  }

  initalizeScene = () => {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(0, 50, 0);
    // this.camera.position.set(0, 40, 50);

    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(this.sceneColor);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // helper
    // const axesHelper = new THREE.AxesHelper(100);
    // this.scene.add(axesHelper);

    document.getElementById("root").append(this.renderer.domElement);
  };

  addBoard = () => {
    this.scene.add(new Board());
  };

  addCheckers = (checkers) => {
    checkers.forEach((checker) => {
      let checkerModel = new Checker(this);
    });
  };

  render = async () => {
    await sleep(1000);

    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize = () => {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }
}

export default Models;
