import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**----------------------
 *    Connect z serwerem
 *------------------------**/
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log(`You connected to with id: ${socket.id}`);
});

/**----------------------
 *    Nasłuchiwanie na tablice
 *------------------------**/
socket.on("receive-active-pieces", (pieces) => {
  console.log(pieces);
});

/**----------------------
 *    Żądanie otrzymania tablicy
 *------------------------**/
function getActivePiecesArr() {
  socket.emit("request-active-pieces");
}

/**----------------------
 *    Nasłuchiwanie na nowy ruch pionka
 *------------------------**/
socket.on("receive-moved-piece", (pieces) => {
  console.log(pieces);
});

/**----------------------
 *    Wyslij pionek
 *------------------------**/
export function sendPiece(pieceInfo) {
  socket.emit("request-moved-piece", pieceInfo);
}
