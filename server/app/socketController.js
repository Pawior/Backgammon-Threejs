let { activePiecesArr } = require("./model");

// module.exports = (io, socket) => {
//   const handleSendPiecesArr = () => {
//     console.log("tablic pionkow leci");
//     io.emit("receive-active-pieces", activePiecesArr);
//   };
//   socket.on("request-active-pieces", handleSendPiecesArr);

//   const handleSendPiece = (pieceInfo) => {
//     console.log("pionek leci");
//     console.log(pieceInfo);
//     io.emit("receive-moved-piece", pieceInfo);
//   };
//   socket.on("request-moved-piece", (pieceInfo) => {
//     handleSendPiece(pieceInfo);
//   });

// };

function sendState() {}

// Pionek, index, newPosition
