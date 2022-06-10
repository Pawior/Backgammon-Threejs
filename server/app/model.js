let activePiecesArr = [
  { name: "piece1", position: { index: 1, level: 1 }, color: 1 },
  { name: "piece2", position: { index: 1, level: 2 }, color: 1 },
  { name: "piece3", position: { index: 12, level: 2 }, color: 1 },
  { name: "piece4", position: { index: 12, level: 2 }, color: 1 },
  { name: "piece5", position: { index: 12, level: 3 }, color: 1 },
  { name: "piece6", position: { index: 12, level: 4 }, color: 1 },
  { name: "piece7", position: { index: 12, level: 5 }, color: 1 },
  { name: "piece8", position: { index: 17, level: 1 }, color: 1 },
  { name: "piece9", position: { index: 17, level: 2 }, color: 1 },
  { name: "piece10", position: { index: 17, level: 3 }, color: 1 },
  { name: "piece11", position: { index: 19, level: 1 }, color: 1 },
  { name: "piece12", position: { index: 19, level: 2 }, color: 1 },
  { name: "piece13", position: { index: 19, level: 3 }, color: 1 },
  { name: "piece14", position: { index: 19, level: 4 }, color: 1 },
  { name: "piece15", position: { index: 19, level: 5 }, color: 1 },
  { name: "piece16", position: { index: 24, level: 1 }, color: 2 },
  { name: "piece17", position: { index: 24, level: 2 }, color: 2 },
  { name: "piece18", position: { index: 13, level: 2 }, color: 2 },
  { name: "piece19", position: { index: 13, level: 2 }, color: 2 },
  { name: "piece20", position: { index: 13, level: 3 }, color: 2 },
  { name: "piece21", position: { index: 13, level: 4 }, color: 2 },
  { name: "piece22", position: { index: 13, level: 5 }, color: 2 },
  { name: "piece23", position: { index: 8, level: 1 }, color: 2 },
  { name: "piece24", position: { index: 8, level: 2 }, color: 2 },
  { name: "piece25", position: { index: 8, level: 3 }, color: 2 },
  { name: "piece26", position: { index: 6, level: 1 }, color: 2 },
  { name: "piece27", position: { index: 6, level: 2 }, color: 2 },
  { name: "piece28", position: { index: 6, level: 3 }, color: 2 },
  { name: "piece29", position: { index: 6, level: 4 }, color: 2 },
  { name: "piece30", position: { index: 6, level: 5 }, color: 2 },
];

let beatenPiecesArr = [];

let moves = [];

let games = {
  game1: {
    users: [],
    checkers: [],
    moves: [
      {
        id: 1,
        newPosition: { index: 1, level: 1 },
        finalMove: true,
      },
    ],
  },
  game2: {},
};
let users = {};

module.exports = { activePiecesArr, beatenPiecesArr, users, games };
