let { activePiecesArr } = require("./model");

module.exports = (io, socket) => {
  const handleSendPiecesArr = () => {
    console.log("tablic pionkow leci");
    io.emit("receive-active-pieces", activePiecesArr);
  };
  socket.on("request-active-pieces", handleSendPiecesArr);

  const handleSendPiece = (pieceMoveInfo) => {
    let state = "opponents-turn";
    console.log(pieceMoveInfo);
    if (pieceMoveInfo.finalMove == true) {
      state = "your-turn";
    }
    state = "opponents-turn";
    console.log("pionek leci");
    console.log(pieceMoveInfo);
    socket.broadcast.emit("receive-communication", state, pieceMoveInfo);
  };
  socket.on("request-communication", (pieceMoveInfo) => {
    handleSendPiece(pieceMoveInfo);
  });
};

// module.exports = (io, socker) => {};

// Pionek, index, newPosition
/*
opponents-turn
your-turn


*/
