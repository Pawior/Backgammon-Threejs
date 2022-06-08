const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT;
const { createServer } = require("http");
const httpServer = createServer(app);
const routerJS = require("./app/router");
// const path = require("path");

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

console.log("test");

/**----------------------
 *    PARSER
 *------------------------**/
app.use(express.static("../client"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// app.use(express.static("static"));

app.use("/", routerJS);

httpServer.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

const socketController = require("./app/socketController");
const onConnection = (socket) => {
  socketController(io, socket);
};

io.on("connection", onConnection);

module.exports = { io };
