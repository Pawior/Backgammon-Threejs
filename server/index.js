const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const routerJS = require("./app/router");

app.use(express.static("../client"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
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
