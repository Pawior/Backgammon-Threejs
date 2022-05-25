let { activePiecesArr } = require("./model");

module.exports = (io, socket) => {
  const sendActivePiecesArr = () => {
    console.log("cos leci?");
    socket.broadcast.emit("receive-active-pieces", activePiecesArr);
    io.emit("receive-active-pieces", activePiecesArr);
  };
  socket.on("request-active-pieces", sendActivePiecesArr);
};
