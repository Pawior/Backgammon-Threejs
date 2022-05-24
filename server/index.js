const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT;
// const server = require("http").createServer();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const routerJS = require("./app/router");

// app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "50mb",
//   })
// );
app.use(express.static("static"));

const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  // ...
});

// const io = require("socket.io")(server, {
//   // ZAMIAST server - port ???
//   cors: {
//     origin: ["http://127.0.0.1:5500"],
//   },
// });

const userIo = io.of("/user");
userIo.on("connection", (socket) => {
  console.log("Connected to user namespace with username " + socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("Couldn't connect to user namespace, please send token'"));
  }
});

function getUsernameFromToken(token) {
  return token;
}

io.on("connection", (socket) => {
  console.log(socket.id);
  // socket.on("custom-event", (number, string, obj) => {
  //   console.log(number, string, obj);
  // });
  socket.on("send-message", (message) => {
    console.log(message);
    // io.emit("receive-message", message);
    socket.broadcast.emit("receive-message", message);
  });
});

httpServer.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

app.use("/", routerJS);
