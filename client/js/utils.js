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

function getFilledArr(value, length, arr) {
  for (let i = 0; i < length; i++) {
    arr.push(value);
  }

  return arr;
}

function setMeshColor(mesh, color) {
  // https://www.quora.com/How-do-I-convert-a-hexadecimal-value-to-a-string-using-JavaScript-for-example-0xAB-in-hex-converts-to-string-AB
  const colorText = color.toString(16);

  const red = ("0x" + colorText.substring(0, 2)) / 255;
  const green = ("0x" + colorText.substring(2, 4)) / 255;
  const blue = ("0x" + colorText.substring(4, 6)) / 255;

  // console.log(colorString.substring(0, 3));
  // console.log(colorString.substring(3, 6));
  // console.log(colorString.substring(6, 9));

  mesh.material.color.r = red;
  mesh.material.color.g = green;
  mesh.material.color.b = blue;
}

// function hexColor

// function hexColorToThreeJsFormat(hex) {
//   const power = [0, 1, 2, 4];
// }

// function hexToBin(hex) {
//   const hexDigitsMap = {
//     0: "0000",
//     1: "0001",
//     2: "0010",
//     3: "0011",
//     4: "0100",
//     5: "0101",
//     6: "0110",
//     7: "0111",
//     8: "1000",
//     9: "1001",
//     a: "1010",
//     b: "1011",
//     c: "1100",
//     d: "1101",
//     e: "1110",
//     f: "1111",
//   };

//   for (let i = 0; i < hex.length )
// }

export { sleep, getField, getFilledArr, setMeshColor };
