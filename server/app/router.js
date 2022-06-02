const express = require("express");
const app = express();
let path = require("path");
const controller = require("./controller");
const mongoController = require("./mongoController");

// const { registerView, loginView } = require("../controllers/loginController");
const router = express.Router();

// app.get("/", (req, res) => {
//   console.log("cos dziala");
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, +"/views/index.html"));
// });

// app.get("/", controller.getMain);

router.get("/", controller.getHomePage);
router.post("/getActivePiecesArr", controller.getActivePiecesArr);
router.post("/getBeatenPiecesArr", controller.getBeatenPiecesArr);
router.post("/addActivePiece", controller.addActivePiece);
router.post("/addBeatenPiece", controller.addBeatenPiece);
router.post("/mongo/addScore", (req, res) => {
  mongoController.addScore(req, res);
});

// router.get("/", (req, res) => {
//   console.log("cos dziala");
//   console.log(__dirname);
//   console.log(__dirname, "..", "..");
//   // res.sendFile(path.join(__dirname, "..", "..", "client", "index.html"));
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });
// router.get("/login", loginView);

module.exports = router;
