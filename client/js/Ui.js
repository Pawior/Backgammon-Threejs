import Net from "./Net.js";

export default class Ui {
  static async handleLoginScreen(setPlayersColor, setGameState) {
    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();

      const loginSection = document.querySelector("#login-section");
      loginSection.style.display = "none";

      // const startInfo = await Net.getStartInfo(url);
      if (startInfo.state !== "your-turn") {
        this.showWaitingScreen();
      }

      setPlayersColor(startInfo.color);
      setGameState(startInfo.state);

      Net.monitorAndHandleGameState(setGameState);
    });
  }

  static showWaitingScreen() {
    let waitingScreen = document.querySelector("#waiting-screen");
    waitingScreen.style.display = "initial";
  }
}
