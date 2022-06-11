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
    fieldsPositions,
    checkAndHandleWin
  ) {
    // const socket = io("http://localhost:3000/", { transports: ["websocket"] });
    socket.on("receive-communication", (state, move) => {
      console.log(state);
      handleStateChange(state, setGameState);

      if (move) {
        console.log(move);

        handleOpponentsMove(
          move,
          checkerData,
          checkerModels,
          checkerWidth,
          checkerMargin,
          fieldsPositions,
          checkAndHandleWin
        );
      }
    });
  }

  static sendMove(move) {
    // const socket = io("http://localhost:3000/", { transports: ["websocket"] });
    socket.emit("request-communication", move);
  }

  static saveGameInfo(winner, loser) {
    let body = {
      winnerColor: winner,
      loserColor: loser,
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`http://localhost:3000/endGame`, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  static saveUserStat(userColor) {
    let body = {
      userColor: userColor,
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`http://localhost:3000/mongoaddUserStat`, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}
