// data
import checkers from "./data/checkers.js";

// handle click
import { handleTriangleClick } from "./game/clickHandlers/triangleClickHandler.js";
import { handlecheckerClick } from "./game/clickHandlers/checkerClickHandler.js";

//
import Models from "./Models.js";
import Ui from "./Ui.js";

import addDiceListener from "./game/addDiceListener.js";

class Game {
  constructor() {
    this.checkers = checkers;
    this.checkerModels = [];
    this.fieldsPositions = [];
    this.selectedCheckerColor = 0xffd24c;
    // this.selectedCheckerColor = "255210076";
    this.isClickingAllowed = true;
    this.isFinishingPhase = false;

    // Models
    let models = new Models();
    models.initalizeScene();
    models.handleWindowResize();
    models.addBoard(this.addFieldPosition);
    models.addCheckers(this.checkers, this.addCheckerModel);
    models.render();

    this.scene = models.getScene();
    this.camera = models.getCamera();
    this.checkerWidth = models.getCheckerWidth();
    this.checkerMargin = models.getCheckerMargin();

    // Ui
    Ui.handleLoginScreen(
      this.setPlayersColor,
      this.setGameState,
      this.checkers,
      this.checkerModels,
      this.checkerWidth,
      this.checkerMargin,
      this.fieldsPositions
    );

    this.addClickListener(models);

    addDiceListener(
      this.clearNumbersThrown,
      this.addNumberThrown,
      this.getNumbersThrown,
      this.getMovesLeft,
      this.setMovesLeft
    );

    this.playersColor = 1;
    this.numbersThrown = [];
    this.movesLeft;
  }

  addClickListener = (models) => {
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
          handleTriangleClick(
            object,
            this.availableMoves,
            this.checkers,
            this.selectedChecker,
            models.getCheckerWidth(),
            models.getCheckerMargin(),
            this.changeCheckerPosition,
            this.checkerModels,
            this.setAvailableMoves,
            this.isClickingAllowed,
            this.setIsClickingAllowed,
            this.checkAndHandleFinishingPhase,
            this.movesLeft,
            this.setMovesLeft
          );
        } else if (object.name === "checker") {
          handlecheckerClick(
            object,
            this.numbersThrown,
            this.checkers,
            this.setSelectedChecker,
            this.setAvailableMoves,
            this.selectedCheckerColor,
            this.selectedChecker,
            this.isClickingAllowed,
            this.setIsClickingAllowed,
            this.isFinishingPhase,
            this.checkAndHandleWin
          );
        }
      }
    });
  };

  checkAndHandleFinishingPhase = (color, checkersData) => {
    const indexToCheckForColor = [
      { start: 1, end: 18 },
      { start: 7, end: 24 },
    ];
    const checkersNotInHome = checkersData.filter(
      (checker) =>
        ((checker.position.index <= indexToCheckForColor[color - 1].end &&
          checker.position.index >= indexToCheckForColor[color - 1].start) ||
          checker.position.isOnBar) &&
        checker.color === color
    );

    // console.log(checkersNotInHome.length);

    if (checkersNotInHome.length === 0) {
      this.isFinishingPhase = true;
    }
  };

  checkAndHandleWin = () => {
    const checkersLeft = this.checkers.filter(
      (checker) => checker.color === this.playersColor && !checker.outOfGame
    );

    if (checkersLeft.length > 0) return;

    // won
    // Net.saveGameInfo(this.playersColor, this.playersColor) // TODO
    console.log("you won");
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  getCheckers() {
    return this.checkers;
  }

  getNumbersThrown = () => {
    return this.numbersThrown;
  };

  addNumberThrown = (number) => {
    this.numbersThrown.push(number);
  };

  clearNumbersThrown = () => {
    this.numbersThrown = [];
  };

  getAvailableMoves = () => {
    return this.availableMoves;
  };

  setAvailableMoves = (availableMoves) => {
    this.availableMoves = availableMoves;
  };

  setSelectedChecker = (selectedChecker) => {
    this.selectedChecker = selectedChecker;
  };

  getSelectedChecker = () => {
    return this.selectedChecker;
  };

  changeCheckerPosition = (checkerId, index, level) => {
    for (let i = 0; i < this.checkers.length; i++) {
      if (this.checkers[i].id === checkerId) {
        this.checkers[i].position.index = index;
        this.checkers[i].position.level = level;

        this.checkers[i].position.isOnBar = false;

        return this.checkers[i];
      }
    }
  };

  addCheckerModel = (checkerModel) => {
    this.checkerModels.push(checkerModel);
  };

  setIsClickingAllowed = (isClickingAllowed) => {
    this.isClickingAllowed = isClickingAllowed;
  };

  setPlayersColor = (color) => {
    this.playersColor = color;
  };

  setGameState = (state) => {
    this.gameState = state;
  };

  addFieldPosition = (fieldPosition) => {
    this.fieldsPositions.push(fieldPosition);
  };

  setMovesLeft = (number) => {
    this.movesLeft = number;
  };

  getMovesLeft = () => {
    return this.movesLeft;
  };
}

export default Game;
