import Field from "./Field.js";

class FieldsSection extends THREE.Object3D {
  constructor(
    level,
    trianglesColor1,
    trianglesColor2,
    boardColor,
    fieldWidth,
    fieldHeight,
    startIndexNumber,
    xSeparationWidth,
    ySeparationHeight
  ) {
    super();

    this.level = level;
    this.trianglesColor1 = trianglesColor1;
    this.trianglesColor2 = trianglesColor2;
    this.boardColor = boardColor;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.startIndexNumber = startIndexNumber;
    this.xSeparationWidth = xSeparationWidth;
    this.ySeparationHeight = ySeparationHeight;

    this.width = 0;

    this.addFields();

    this.name = "fieldsSection";

    if (this.level === 2) {
      this.rotation.z = Math.PI;
      // this.position.y = this.height;
    }
  }

  addFields = () => {
    for (let i = 0; i < 6; i++) {
      const color = i % 2 === 1 ? this.trianglesColor1 : this.trianglesColor2;

      const index = this.startIndexNumber + i;
      const myPosition2d = this.getMyPosition(index);

      let field = new Field(
        color,
        this.boardColor,
        this.fieldWidth,
        this.fieldHeight,
        this.level,
        index,
        myPosition2d
      );

      if (!this.height) this.height = field.getHeight();
      this.width += field.getWidth();

      // placing fields in order
      field.position.x = -(i * field.getWidth());

      this.add(field);
    }
  };

  getMyPosition = (index) => {
    if (this.level === 1) {
      const z = -(this.fieldHeight + this.ySeparationHeight / 2);
      if (index <= 6) {
        const xOffset =
          this.fieldWidth * 6 + this.xSeparationWidth / 2 - this.fieldWidth / 2;
        return {
          x: -(index - 1) * this.fieldWidth + xOffset,
          z: z,
        };
      } else if (index <= 12) {
        const xOffset = -(this.fieldWidth / 2 + this.xSeparationWidth / 2);

        return {
          x: -(index - 1 - 6) * this.fieldWidth + xOffset,
          z: z,
        };
      }
    } else if (this.level === 2) {
      const z = this.fieldHeight + this.ySeparationHeight / 2;
      if (index <= 18) {
        const xOffset =
          -(this.fieldWidth * 6 + this.xSeparationWidth / 2) +
          this.fieldWidth / 2;
        return {
          x: (index - 1 - 12) * this.fieldWidth + xOffset,
          z: z,
        };
      } else if (index <= 24) {
        const xOffset = this.fieldWidth / 2 + this.xSeparationWidth / 2;

        return {
          x: (index - 1 - 18) * this.fieldWidth + xOffset,
          z: z,
        };
      }
    }
  };

  ///// getters like methods

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }
}

export default FieldsSection;
