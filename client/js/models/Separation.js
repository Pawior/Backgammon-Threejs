class Separation extends THREE.Mesh {
  constructor(width, height, color) {
    super();

    this.color = color;

    this.width = width;
    this.height = height;

    this.initailize();
  }

  initailize = () => {
    this.geometry = new THREE.PlaneGeometry(this.width, this.height);
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
  };
}

export default Separation;
