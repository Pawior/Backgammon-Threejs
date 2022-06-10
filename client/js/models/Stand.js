class Stand extends THREE.Mesh {
  constructor(width, height, color) {
    super();

    this.width = width;
    this.height = height;
    this.color = color;

    this.depth = 2;

    this.initailize();
  }

  initailize = () => {
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshToonMaterial({ color: this.color });
  };

  ////////////////////////////

  getDepth() {
    return this.depth;
  }
}

export default Stand;
