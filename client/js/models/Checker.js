class Checker extends THREE.Mesh {
  constructor(id, width, color, index, level) {
    super();

    this.colorNumber = color;
    this.width = width;
    this.height = 1;
    this.colorOne = 0xdddddd;
    this.colorTwo = 0xdb4621;

    this.initailize();
    this.name = "checker";
    this.myId = id;
    this.index = index;
    this.level = level;
    this.isOnBar = false;
  }

  initailize = () => {
    this.geometry = new THREE.CylinderGeometry(
      this.width / 2,
      this.width / 2,
      this.height,
      30
    );

    const color = this.colorNumber === 1 ? this.colorOne : this.colorTwo;
    this.userData.color = color;
    this.material = new THREE.MeshToonMaterial({ color: color });
  };

  getMyId() {
    return this.myId;
  }

  getColorNumber() {
    return this.colorNumber;
  }

  getIndex() {
    return this.index;
  }

  setIndex = (index) => {
    this.index = index;
  };

  getLevel() {
    return this.level;
  }

  setLevel = (level) => {
    this.level = level;
  };

  getStandardColor() {
    return this.userData.color;
  }

  getIsOnBar() {
    return this.isOnBar;
  }

  setIsOnBar = (isOnBar) => {
    this.isOnBar = isOnBar;
  };

  setIsOutOfGame = (isOutOfGame) => {
    this.isOutOfGame = isOutOfGame;
  };

  //   set position(p) {
  //     this.position = p;
  //   }

  //   getPosition = () => {
  //     return this.position;
  //   };

  //   setPosition(position) {
  //     this.position = position;
  //   }
}

export default Checker;
