const express = require("express");
const app = express();
let path = require("path");

// const { registerView, loginView } = require("../controllers/loginController");
const router = express.Router();

// app.get("/", (req, res) => {
//   console.log("cos dziala");
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, +"/views/index.html"));
// });

router.get("/", (req, res) => {
  console.log("cos dziala");
  console.log(__dirname);
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
// router.get("/login", loginView);

module.exports = router;
