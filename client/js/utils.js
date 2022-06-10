function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function getField(index, scene) {
  let board;

  // getting board
  for (let sceneChild of scene.children) {
    if (sceneChild.name === "board") {
      board = sceneChild;
      break;
    }
  }

  if (!board) return;

  let fieldsSections = [];
  // getting fieldsSections
  for (let boardChild of board.children) {
    if (boardChild.name === "fieldsSection") {
      fieldsSections.push(boardChild);
    }
  }

  if (fieldsSections.length === 0) return;

  // getting field
  for (let fieldsSection of fieldsSections) {
    for (let fieldsSectionChild of fieldsSection.children) {
      if (fieldsSectionChild.getIndex() === index) {
        return fieldsSectionChild;
      }
    }
  }
}

function setMeshColor(mesh, color) {
  // https://www.quora.com/How-do-I-convert-a-hexadecimal-value-to-a-string-using-JavaScript-for-example-0xAB-in-hex-converts-to-string-AB
  const colorText = color.toString(16);

  const red = ("0x" + colorText.substring(0, 2)) / 255;
  const green = ("0x" + colorText.substring(2, 4)) / 255;
  const blue = ("0x" + colorText.substring(4, 6)) / 255;

  mesh.material.color.r = red;
  mesh.material.color.g = green;
  mesh.material.color.b = blue;
}

export { sleep, getField, setMeshColor };
