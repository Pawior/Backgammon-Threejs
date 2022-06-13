import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io(`/`);
socket.on("connect", () => {
  console.log("connected to socket io");
});

let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener("click", () => {
  getActivePiecesArr();
});
socket.on("receive-active-pieces", (pieces) => {
  console.log(pieces);
});
function getActivePiecesArr() {
  socket.emit("request-active-pieces");
}
