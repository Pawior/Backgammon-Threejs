import Field from "./Field.js";

class FieldsSection extends THREE.Object3D {
  constructor(
    level,
    trianglesColor1,
    trianglesColor2,
    boardColor,
    fieldWidth,
    fieldHeight,
    startIndexNumber
  ) {
    super();

    this.level = level;
    this.trianglesColor1 = trianglesColor1;
    this.trianglesColor2 = trianglesColor2;
    this.boardColor = boardColor;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.startIndexNumber = startIndexNumber;

    this.width = 0;

    this.addFields();

    if (this.level === 2) {
      this.rotation.z = Math.PI;
      // this.position.y = this.height;
    }
  }

  addFields = () => {
    for (let i = 0; i < 6; i++) {
      const color = i % 2 === 1 ? this.trianglesColor1 : this.trianglesColor2;

      const index = this.startIndexNumber + i;
      let field = new Field(
        color,
        this.boardColor,
        this.fieldWidth,
        this.fieldHeight,
        this.level,
        index
      );

      if (!this.height) this.height = field.getHeight();
      this.width += field.getWidth();

      // placing fields in order
      field.position.x = -(i * field.getWidth());

      this.add(field);
    }
  };

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }
}

export default FieldsSection;
