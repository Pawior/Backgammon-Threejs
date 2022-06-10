import handleStateChange from "./game/handleStateChange";

export default class Net {
  static async logIn(nick) {
    const body = JSON.stringify({ nick: nick });
    const req = await fetch("/logIn", { method: "POST", body: body });

    const info = await req.json();

    return info;
  }

  // static monitorAndHandleGameState(setGameState) {
  //   const socket = io("/");
  //   socket.on("state-change", (opponentsMoves, checkersData, state) => {
  //     setGameState(state);
  //   });
  // }

  static monitorState(handleOpponentMove) {
    const socket = io("/");
    socket.on("state-change", (state, move) => {
      handleStateChange(state);
      if (move) {
        handleOpponentMove(move);
      }
    });
  }
}
