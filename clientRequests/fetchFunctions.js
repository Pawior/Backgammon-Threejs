const server = `http://localhost:${process.env.PORT}`;

/**============================================
 *               Tutaj masz przykładowe body fetcha, ale pewnie najlepiej
 *               jak sobie dodasz argumenty które do tych funkcji żeby to body
 *               sobie zmieniać wywołując funkcje
 *=============================================**/

/**----------------------
 *    Dodanie aktywnego Pionka
 *------------------------**/
export function addActivePieceFunc() {
  let body = {
    name: "piece77",
    position: {
      index: 1,
      level: 1,
    },
    color: 1,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  fetch(`${server}/addActivePiece`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

/**----------------------
 *    Dodanie zbitego pionka
 *------------------------**/

export function addBeatenPieceFunc() {
  let body = {
    name: "piece77",
    position: {
      index: 1,
      level: 1,
    },
    color: 1,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  fetch(`${server}/addBeatenPiece`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

/**----------------------
 *    GETY zbitych i aktywnych
 *------------------------**/

let gettingOptions = {
  method: "POST",
};
export function getActivePiecesFunc() {
  fetch(`${server}/getActivePiecesArr`, gettingOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export function getBeatenPiecesFunc() {
  fetch(`${server}/getBeatenPiecesArr`, gettingOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
