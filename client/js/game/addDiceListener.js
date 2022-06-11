export default function addDiceListener(
  clearNumbersThrown,
  addNumberThrown,
  getNumbersThrown,
  movesLeft,
  setMovesLeft
) {
  const dice = document.querySelector("#dice");

  dice.addEventListener("click", function () {
    if (typeof movesLeft !== "undefined") return;

    clearNumbersThrown();
    const number1 = Math.floor(Math.random() * 6 + 1);
    const number2 = Math.floor(Math.random() * 6 + 1);
    addNumberThrown(number1);
    addNumberThrown(number2);

    if (number1 !== number2) {
      setMovesLeft(4);
    } else {
      setMovesLeft(2);
    }

    const lastNumberThrown = number2;

    let diceImage = dice.querySelector("img");
    diceImage.src = `images/dice/${lastNumberThrown}.svg`;

    // adding results
    let resultsContainer = document.querySelector("#results-container");
    resultsContainer.innerHTML = "";

    getNumbersThrown().forEach((number) => {
      let result = document.createElement("img");
      result.src = `images/dice/${number}.svg`;
      result.alt = "dice image";
      resultsContainer.append(result);
    });
  });
}
