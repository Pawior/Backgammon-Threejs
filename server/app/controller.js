let { activePiecesArr } = require("./model");
let { beatenPiecesArr } = require("./model");
let { users, games } = require("./model");
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
  logIn: (req, res) => {
    const nick = req.body.nick;
    const color = users.length + 1;
    users.push({ nick: nick, color: color });
    console.log(users);
    res.json({ color: color });
  },
  handleState: (req, res) => {
    let state = req.body.state;
    if (state === "waiting-for-opponent") {
      res.send({ message: "showLoadingScreen" });
    } else if (state === "your-turn") {
      res.send({ message: "hideWaitingScreen" });
    } else if (state === "opponents-turn") {
      res.send({ message: "showWaitingScreen" });
    } else if (state === "you-won") {
      res.send({ message: "victory" });
    } else if (state === "you-lost") {
      res.send({ message: "lost" });
    } else {
      res.error({ message: "cant find that status" });
    }
  },
};
