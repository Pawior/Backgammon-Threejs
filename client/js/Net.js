import handleStateChange from "./net/handleStateChange.js";
import handleOpponentsMove from "./net/handleOpponentsMove.js";

export default class Net {
  constructor() {
    this.socket = io(`/`, {
      transports: ["websocket"],
    });
  }

  logIn = async (nick) => {
    const body = JSON.stringify({ nick: nick });
    const req = await fetch("/logIn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });

    const info = await req.json();

    return info;
  };

  monitorState = (
    setGameState,
    checkerData,
    checkerModels,
    checkerWidth,
    checkerMargin,
    fieldsPositions,
    checkAndHandleWin
  ) => {
    this.socket.on("receive-communication", (state, move) => {
      // console.log(state);
      handleStateChange(state, setGameState);

      if (move) {
        // console.log(move);

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
  };

  sendMove = (move) => {
    this.socket.emit("request-communication", move);
  };

  endTurn = () => {
    this.socket.emit("request-communication");
  };

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

    fetch(`/endGame`, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  static saveUserStat(data) {
    let body = {
      userColor: data.userColor,
      result: data.result,
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`/mongoaddUserStat`, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}
