import Net from "./Net.js";

export default class Ui {
  static handleLoginScreen(
    setPlayersColor,
    setGameState,
    checkerData,
    checkerModels,
    checkerWidth,
    checkerMargin,
    fieldsPositions,
    checkAndHandleWin
  ) {
    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const loginSection = document.querySelector("#login-section");
      loginSection.style.display = "none";

      const nickInput = document.querySelector("#nick");
      const nick = nickInput.value;
      const startInfo = await Net.logIn(nick);
      setPlayersColor(startInfo.color);

      this.showWaitingScreen();

      if (startInfo.color === 2) {
        this.hideWaitingScreen();
      }

      // setGameState(startInfo.state);

      Net.monitorState(
        setGameState,
        checkerData,
        checkerModels,
        checkerWidth,
        checkerMargin,
        fieldsPositions,
        checkAndHandleWin
      );
    });
  }

  static showWaitingScreen() {
    let waitingScreen = document.querySelector("#waiting-screen");
    waitingScreen.style.display = "initial";
  }

  static hideWaitingScreen() {
    let waitingScreen = document.querySelector("#waiting-screen");
    waitingScreen.style.display = "none";
  }

  static handleEndOfTurnButton(setMovesLeft) {
    let button = document.querySelector("#end-of-turn-button");
    button.addEventListener("click", () => {
      this.showWaitingScreen();
      Net.endTurn();
      setMovesLeft(undefined);
    });
  }

  static showMessage(message) {
    let messageScreen = document.querySelector("#message-screen");
    messageScreen.style.display = "flex";

    let messageElement = document.querySelector("#message");
    messageElement.innerText = message;
  }
}
