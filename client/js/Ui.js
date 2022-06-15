export default class Ui {
  static handleLoginScreen(
    setPlayersColor,
    setGameState,
    checkerData,
    checkerModels,
    checkerWidth,
    checkerMargin,
    fieldsPositions,
    checkAndHandleWin,
    monitorState,
    logIn
  ) {
    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const loginSection = document.querySelector("#login-section");
      loginSection.style.display = "none";

      const nickInput = document.querySelector("#nick");
      const nick = nickInput.value;
      const startInfo = await logIn(nick);
      setPlayersColor(startInfo.color);

      this.showWaitingScreen();

      if (startInfo.color === 2) {
        this.hideWaitingScreen();
      }

      // setGameState(startInfo.state);

      monitorState(
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

  static handleEndOfTurnButton(setMovesLeft, endTurn) {
    let button = document.querySelector("#end-of-turn-button");
    button.addEventListener("click", () => {
      this.showWaitingScreen();
      endTurn();
      setMovesLeft(undefined);
    });
  }

  static handleResetGame() {
    let button = document.querySelector("#reset-game");
    button.addEventListener("click", () => {
      let options = {
        method: "POST",
      };
      fetch("/resetGame", options)
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
          console.log(data);
        });
    });
  }

  static showMessage(message, playersColor) {
    let messageScreen = document.querySelector("#message-screen");
    messageScreen.style.display = "flex";

    let messageElement = document.querySelector("#message");
    messageElement.innerText = message;

    let statsLink = messageScreen.querySelector("a");

    // statsLink.href = `../stats.html`;
    statsLink.onclick = function () {
      modal.style.display = "block";
    };
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("userStatModal");

    span.onclick = function () {
      modal.style.display = "none";
    };

    let body = {
      userColor: 1,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    let userStatsContainer = document.querySelector("#userStats-container");
    let userStatsPuserName = document.querySelector("#userStats-p-userName");
    let userStatsPwins = document.querySelector("#userStats-p-wins");
    let userStatsPloses = document.querySelector("#userStats-p-loses");
    fetch(`/postSpecificUserStat`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        try {
          userStatsPuserName.innerHTML += `<span class="writtenInfo"> ${data.userName} </span>`;
          userStatsPwins.innerHTML += ` <span class="writtenInfo"> ${data.wins} </span>`;
          userStatsPloses.innerHTML += `<span class="writtenInfo"> ${data.loses} </span>`;
        } catch (e) {
          console.error(e);
          console.log(e);
        }
      });
  }
}
