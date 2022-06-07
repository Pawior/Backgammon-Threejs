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
router.use(express.urlencoded({ extended: true }));

router.use(express.json({ limit: "50mb" }));

router.post("/getActivePiecesArr", controller.getActivePiecesArr);
router.post("/getBeatenPiecesArr", controller.getBeatenPiecesArr);
router.post("/addActivePiece", controller.addActivePiece);
router.post("/addBeatenPiece", controller.addBeatenPiece);
router.post("/mongoaddScore", express.json(), async function (req, res) {
  console.log("Hop 1");
  await mongoController.addScore(req, res);
  console.log("Hop 2");
  // res.json("data");
});
router.get("/getFullLeaderboard", mongoController.getFullLeaderboard);
router.get("/", controller.getHomePage);

// router.get("/", (req, res) => {
//   console.log("cos dziala");
//   console.log(__dirname);
//   console.log(__dirname, "..", "..");
//   // res.sendFile(path.join(__dirname, "..", "..", "client", "index.html"));
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });
// router.get("/login", loginView);

module.exports = router;
