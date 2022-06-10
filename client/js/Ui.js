import Net from "./Net.js";

export default class Ui {
  static handleLoginScreen(setPlayersColor, setGameState) {
    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const loginSection = document.querySelector("#login-section");
      loginSection.style.display = "none";

      const startInfo = await Net.logIn();
      setPlayersColor(startInfo.color);
      this.showWaitingScreen();
      // setGameState(startInfo.state);

      Net.monitorAndHandleGameState(setGameState);
    });
  }

  static showWaitingScreen() {
    let waitingScreen = document.querySelector("#waiting-screen");
    waitingScreen.style.display = "initial";
  }
}
