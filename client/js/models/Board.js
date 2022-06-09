import FieldsSection from "./FieldsSection.js";
import Separation from "./Separation.js";
import Stand from "./Stand.js";

class Board extends THREE.Object3D {
  constructor(
    xSeparationWidth,
    ySeparationHeight,
    standPadding,
    fieldWidth,
    fieldHeight
  ) {
    super();

    this.xSeparationWidth = xSeparationWidth;
    this.ySeparationHeight = ySeparationHeight;
    this.standPadding = standPadding;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.width = 0;

    // paette 1 https://colorhunt.co/palette/293462f24c4cec9b3bf7d716
    // this.trianglesColor1 = 0xf7d716;
    // this.trianglesColor2 = 0xf24c4c;
    // this.boardColor = 0xec9b3b;
    // this.standColor = 0x293462;

    // paette 2 https://colorhunt.co/palette/e9d5ca8273974d4c7d363062
    this.trianglesColor1 = 0x827397;
    this.trianglesColor2 = 0x4d4c7d;
    this.boardColor = 0xe9d5ca;
    this.standColor = 0x363062;

    this.sections = [
      { level: 1, index: 1 },
      { level: 1, index: 2, placeForSeparationX: -this.xSeparationWidth },
      {
        level: 2,
        index: 2,
        offsetXMultiplier: -1,
        offsetYMultiplier: -2,
        placeForSeparationY: -this.ySeparationHeight,
        placeForSeparationX: -this.xSeparationWidth,
      },
      {
        level: 2,
        index: 1,
        offsetXMultiplier: -1,
        offsetYMultiplier: -2,
        placeForSeparationY: -this.ySeparationHeight,
      },
    ];

    this.addFieldsSections(this.trianglesColor, this.boardColor);
    this.addSeparations();

    this.name = "board";

    this.calculateWidthAndHeight();

    this.addStand();

    this.rotateBoard();
    this.centerBoard();
  }

  addFieldsSections = () => {
    for (let i = 0; i < this.sections.length; i++) {
      const startIndexNumber = i * 6 + 1;

      let fieldsSection = new FieldsSection(
        this.sections[i].level,
        this.trianglesColor1,
        this.trianglesColor2,
        this.boardColor,
        this.fieldWidth,
        this.fieldHeight,
        startIndexNumber,
        this.xSeparationWidth,
        this.ySeparationHeight
      );
      this.fieldsSectionWidth = fieldsSection.getWidth();
      this.fieldsSectionHeight = fieldsSection.getHeight();

      // placing fields sections in order
      fieldsSection.position.x = -(
        (this.sections[i].index - 1) *
        fieldsSection.getWidth()
      );

      // level 2 correction
      if (this.sections[i].offsetYMultiplier) {
        fieldsSection.position.y +=
          this.sections[i].offsetYMultiplier * fieldsSection.getHeight();
      }

      if (this.sections[i].offsetXMultiplier) {
        fieldsSection.position.x +=
          this.sections[i].offsetXMultiplier * fieldsSection.getWidth();
      }

      // place for separation
      if (this.sections[i].placeForSeparationX) {
        fieldsSection.position.x += this.sections[i].placeForSeparationX;
      }

      if (this.sections[i].placeForSeparationY) {
        fieldsSection.position.y += this.sections[i].placeForSeparationY;
      }

      this.add(fieldsSection);
    }
  };

  addSeparations = () => {
    this.addXSeparation();
    this.addYSeparations();
  };

  addXSeparation = () => {
    const height = this.fieldsSectionHeight * 2 + this.ySeparationHeight;
    let separation = new Separation(
      this.xSeparationWidth,
      height,
      this.standColor
    );
    separation.position.x = -(
      this.fieldsSectionWidth +
      this.xSeparationWidth / 2
    );
    separation.position.y = -(
      this.fieldsSectionHeight +
      this.ySeparationHeight / 2
    );

    this.add(separation);
  };

  addYSeparations = () => {
    const ySeparationsOffsets = [
      0,
      this.fieldsSectionWidth + this.xSeparationWidth,
    ];

    for (const offset of ySeparationsOffsets) {
      const height = this.fieldsSectionHeight * 2 + this.ySeparationHeight;
      let separation = new Separation(
        this.fieldsSectionWidth,
        this.ySeparationHeight,
        this.boardColor
      );
      separation.position.x = -(this.fieldsSectionWidth / 2 + offset);
      separation.position.y = -(
        this.fieldsSectionHeight +
        this.ySeparationHeight / 2
      );

      this.add(separation);
    }
  };

  addStand = () => {
    const width = this.getWidth() + this.standPadding;
    const height = this.getHeight() + this.standPadding;

    let stand = new Stand(width, height, this.standColor);
    stand.position.x += -(width / 2) + this.standPadding / 2;
    stand.position.y += -(height / 2) + this.standPadding / 2;
    stand.position.z = -stand.getDepth() / 2 - 0.01;

    this.add(stand);
  };

  rotateBoard = () => {
    this.rotation.x = -Math.PI / 2;
  };

  centerBoard = () => {
    this.position.x += this.width / 2;
    this.position.z += -this.height / 2;
  };

  calculateWidthAndHeight = () => {
    this.width = this.fieldsSectionWidth * 2 + this.xSeparationWidth;
    this.height = this.fieldsSectionHeight * 2 + this.ySeparationHeight;
  };

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }
}

export default Board;
