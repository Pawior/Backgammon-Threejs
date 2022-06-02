const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

app.use(express.static("../client"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
/**======================
 *    MONGO
 *========================**/
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://root:${encodeURIComponent(
      process.env.mongodb_pass
    )}@cluster0.w8ns7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to Mongoł");
  })
  .catch((err) => {
    console.log("Error connecting to Mongoł " + err);
  });

const routerJS = require("./app/router");

console.log("test");

// app.use(express.static("static"));

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

httpServer.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

app.use("/", routerJS);

const sendActivePiecesArr = require("./app/socketController");
const onConnection = (socket) => {
  sendActivePiecesArr(io, socket);
};

io.on("connection", onConnection);

// module.exports = { io };
