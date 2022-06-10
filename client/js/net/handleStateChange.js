export default function handleStateChange(
  state,
  setGameState,
  hideLoginScreen,
  hideWaitingScreen
) {
  setGameState(state);

  if (state === "waiting-for-opponent") {
  } else if (state === "your-turn") {
    hideWaitingScreen();
  } else if (state === "opponents-turn") {
  } else if (state === "you-won") {
  } else if (state === "you-lost") {
  }
}
