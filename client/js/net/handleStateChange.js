import Ui from "../Ui.js";

export default function handleStateChange(state, setGameState) {
  setGameState(state);
  console.log(state);

  if (state === "waiting-for-opponent") {
  } else if (state === "your-turn") {
    console.log(Ui.hideWaitingScreen);
    Ui.hideWaitingScreen();
  } else if (state === "opponents-turn") {
    console.log(Ui.showWaitingScreen);
    Ui.showWaitingScreen();
  } else if (state === "you-won") {
  } else if (state === "you-lost") {
  }
}
