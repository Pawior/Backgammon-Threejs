import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import {
  addActivePieceFunc,
  addBeatenPieceFunc,
  getActivePiecesFunc,
  getBeatenPiecesFunc,
} from "./clientRequests/fetchFunctions.js";
import { sendPiece } from "./clientRequests/socketFunctions.js";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayMessage(`You connected to with id: ${socket.id}`);
});

socket.emit("custom-event", 10, "Hi", { a: "aa" });

socket.on("receive-message", (message) => {
  displayMessage(message);
});

function displayMessage(message) {
  let divInfo = document.querySelector("#div-info");
  let pTag = document.createElement("p");
  pTag.innerHTML = message;
  divInfo.appendChild(pTag);
}

let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener("click", () => {
  let input = document.querySelector("#input-data");
  sendMessage(input.value);
  socketGetActivePiecesArr();
});

function sendMessage(message) {
  displayMessage(message);
  socket.emit("send-message", message);
}

function socketGetActivePiecesArr() {
  socket.emit("request-active-pieces");
}

let btnAddPionek = document.querySelector("#btn-add-pionek");
btnAddPionek.addEventListener("click", () => {
  addBeatenPieceFunc();
  getBeatenPiecesFunc();
});

let btnSendMove = document.querySelector("#btn-send-move");
btnSendMove.addEventListener("click", () => {
  sendPiece({ id: 2, index: 77, position: "5_5" });
});
