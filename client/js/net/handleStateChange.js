import Ui from "../Ui.js";

export default function handleStateChange(state, setGameState) {
  setGameState(state);

  if (state === "waiting-for-opponent") {
  } else if (state === "your-turn") {
    Ui.hideWaitingScreen();
  } else if (state === "opponents-turn") {
    Ui.showWaitingScreen();
  } else if (state === "you-won") {
  } else if (state === "you-lost") {
  }
}
