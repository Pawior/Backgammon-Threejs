import { getField } from "./utils.js";
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

    // dev view
    // this.camera.position.set(0, 50, 0);
    // this.camera.lookAt(0, 0, 0);

    // view 1
    this.camera.position.set(0, 35, 22);
    this.camera.lookAt(0, 0, 2.7);

    // this.camera.position.set(0, 47, 47);

    // light
    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.lookAt(0, 0, 0);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(this.sceneColor);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // board
    this.xSeparationWidth = 3;
    this.ySeparationHeight = 5;
    this.standPadding = 2.5;
    this.fieldWidth = 3;
    this.fieldHeight = 12;

    this.checkerWidth = 2;
    this.checkerMargin = 0.1;

    document.getElementById("root").append(this.renderer.domElement);

    this.checkersLeveled = Array(24).fill(0);
  };

  addBoard = (addFieldPosition) => {
    let board = new Board(
      this.xSeparationWidth,
      this.ySeparationHeight,
      this.standPadding,
      this.fieldWidth,
      this.fieldHeight,
      addFieldPosition
    );
    this.scene.add(board);
  };

  addCheckers = (checkers, addCheckerModel) => {
    checkers.forEach((checker) => {
      let checkerModel = new Checker(
        checker.id,
        this.checkerWidth,
        checker.color,
        checker.position.index,
        checker.position.level
      );

      let fieldToPlaceOn = getField(checker.position.index, this.scene);
      let fieldPosition = fieldToPlaceOn.getMyPosition();

      checkerModel.position.x = fieldPosition.x;

      checkerModel.position.z = fieldPosition.z;
      this.levelChecker(checkerModel, fieldToPlaceOn);

      addCheckerModel(checkerModel);
      this.scene.add(checkerModel);
    });
  };

  levelChecker = (checker, field) => {
    const fieldIndex = field.getIndex();

    if (field.getLevel() === 1) {
      checker.position.z +=
        this.checkersLeveled[fieldIndex - 1] *
          (this.checkerWidth + this.checkerMargin) +
        this.checkerWidth / 2;
    } else {
      checker.position.z -=
        this.checkersLeveled[fieldIndex - 1] *
          (this.checkerWidth + this.checkerMargin) +
        this.checkerWidth / 2;
    }

    this.checkersLeveled[fieldIndex - 1]++;
  };

  render = async () => {
    // await sleep(1000);

    requestAnimationFrame(this.render);
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize = () => {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  /////////////////////////////////

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  getCheckerWidth() {
    return this.checkerWidth;
  }

  getCheckerMargin() {
    return this.checkerMargin;
  }
}

export default Models;
