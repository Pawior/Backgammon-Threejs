let { activePiecesArr } = require("./model");
let { beatenPiecesArr } = require("./model");
let { users } = require("./model");
let path = require("path");

module.exports = {
  getHomePage: (req, res) => {
    console.log(activePiecesArr);
    console.log("halo");
    console.log(__dirname);
    // res.sendFile(path.join( __dirname, "views", "home.html"));
    res.sendFile(path.join(__dirname, "..", "..", "client", "home.html"));
  },
  getActivePiecesArr: (req, res) => {
    res.send(activePiecesArr);
  },
  getBeatenPiecesArr: (req, res) => {
    res.send(beatenPiecesArr);
  },
  addActivePiece: (req, res) => {
    console.log(req.body);
    activePiecesArr.push(req.body);
    res.send({ info: `dodaje${req.body}` });
  },
  addBeatenPiece: (req, res) => {
    console.log(req.body);
    beatenPiecesArr.push(req.body);
    res.send({ info: `dodaje${req.body}` });
  },
  //
  logIn: (req, res) => {},
};
