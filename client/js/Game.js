import checkers from "./game/checkers.js";
import Models from "./Models.js";

class Game {
  constructor() {
    // this.checkers = checkers;

    let models = new Models();
    models.initalizeScene();
    models.handleWindowResize();
    models.addBoard();
    // models.addCheckers(this.checkers);
    models.render();

    this.scene = models.getScene();
    this.camera = models.getCamera();

    this.addClickListener();
  }

  addClickListener = () => {
    window.addEventListener("click", (event) => {
      const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
      let mouseVector = new THREE.Vector2(); // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, this.camera);

      let intersects = raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
        let object = intersects[0].object;

        if (object.name === "triangle") {
          console.log({
            level: object.parent.getLevel(),
            index: object.parent.getIndex(),
          });
        }
      }
    });
  };

  // handleTriangleClick = (object) => {
  //   object.
  // }

  getCheckers() {
    return this.checkers;
  }
}

export default Game;
