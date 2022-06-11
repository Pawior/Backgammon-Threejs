import handleStateChange from "./net/handleStateChange.js";
import handleOpponentsMove from "./net/handleOpponentsMove.js";
const socket = io("http://localhost:3000/", { transports: ["websocket"] }); // TODO

export default class Net {
  constructor() {
    this.socket = io("http://localhost:3000/", { transports: ["websocket"] });
  }

  static async logIn(nick) {
    const body = JSON.stringify({ nick: nick });
    const req = await fetch("/logIn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });

    const info = await req.json();

    return info;
  }

  static monitorState(
    setGameState,
    checkerData,
    checkerModels,
    checkerWidth,
    checkerMargin,
    fieldsPositions
  ) {
    console.log("tekst");

    // const socket = io("http://localhost:3000/", { transports: ["websocket"] });
    socket.on("receive-communication", (state, move) => {
      console.log(state);
      console.log(move);
      handleStateChange(state, setGameState);
      if (move) {
        handleOpponentsMove(
          move,
          checkerData,
          checkerModels,
          checkerWidth,
          checkerMargin,
          fieldsPositions
        );
      }
    });
  }

  static sendMove(move) {
    // const socket = io("http://localhost:3000/", { transports: ["websocket"] });
    socket.emit("request-communication", move);
  }
}
