import handleStateChange from "./net/handleStateChange.js";

export default class Net {
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
