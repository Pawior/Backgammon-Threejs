class Field extends THREE.Object3D {
  constructor(trianglesColor, boardColor, width, height, level, index) {
    super();

    this.trianglesColor = trianglesColor;
    this.boardColor = boardColor;
    this.width = width;
    this.height = height;

    this.level = level;
    this.index = index;

    this.createField();
  }

  getTriangle = (isBacground, orientation, positionX, positionY) => {
    // https://blog.cjgammon.com/threejs-geometry/
    let shape = new THREE.Shape();

    shape.moveTo(positionX, positionY);

    if (orientation === 1) {
      shape.lineTo(positionX, positionY - this.height);
      shape.lineTo(positionX - this.width / 2, positionY - this.height);
    } else if (orientation === 2) {
      shape.lineTo(positionX - this.width / 2, positionY);
      shape.lineTo(positionX - this.width / 2, positionY - this.height);
    } else if (orientation === 3) {
      shape.lineTo(positionX - this.width / 2, positionY);
      shape.lineTo(positionX, positionY - this.height);
    } else if (orientation === 4) {
      shape.lineTo(positionX, positionY - this.height);
      shape.lineTo(positionX + this.width / 2, positionY - this.height);
    }

    let geometry = new THREE.ShapeGeometry(shape);

    const color = isBacground ? this.boardColor : this.trianglesColor;
    let material = new THREE.MeshBasicMaterial({ color: color });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = "triangle";
    // mesh.position.set(0, 0, 0)

    // this.add(mesh);
    return mesh;
  };

  createField = () => {
    const triangles = [
      { isBackground: true, positionX: 0 },
      { isBackground: false, positionX: 0 },
      { isBackground: false, positionX: -this.width / 2 },
      { isBackground: true, positionX: -this.width },
    ];

    for (let i = 0; i < triangles.length; i++) {
      this.add(
        this.getTriangle(
          triangles[i].isBackground,
          i + 1,
          triangles[i].positionX,
          0
        )
      );
    }
  };

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  getLevel() {
    return this.level;
  }

  getIndex() {
    return this.index;
  }
}

export default Field;
