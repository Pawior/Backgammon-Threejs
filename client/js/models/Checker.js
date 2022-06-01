class Checker extends THREE.Mesh {
  constructor(width, color) {
    super();

    this.color = color;
    this.width = width;
    this.height = 1;

    this.initailize();
  }

  initailize = () => {
    this.geometry = new THREE.CylinderGeometry(this.width / 2, this.height);
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
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
