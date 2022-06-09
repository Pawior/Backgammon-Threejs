export default class Net {
  static async logIn(login) {
    const body = JSON.stringify({ login: login });
    const req = await fetch("/log-in", { body: body });

    const info = await req.json();

    return info;
  }

  static monitorAndHandleGameState(setGameState) {
    const socket = io("/");
    socket.on("state-change", (opponentsMoves, checkersData, state) => {
      setGameState(state);
    });
  }

  static monitorOpponentsMoves(handleOpponentMove) {
    const socket = io("/");
    socket.on("move", (move, checkersData) => {
      handleOpponentMove(move);
    });
  }
}
