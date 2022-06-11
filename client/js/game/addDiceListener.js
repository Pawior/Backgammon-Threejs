export default function addDiceListener(
  clearNumbersThrown,
  addNumberThrown,
  getNumbersThrown,
  getMovesLeft,
  setMovesLeft
) {
  const dice = document.querySelector("#dice");

  dice.addEventListener("click", function () {
    const movesLeft = getMovesLeft();

    if (typeof movesLeft !== "undefined") return;

    clearNumbersThrown();
    const number1 = Math.floor(Math.random() * 6 + 1);
    const number2 = Math.floor(Math.random() * 6 + 1);
    addNumberThrown(number1);
    addNumberThrown(number2);

    setMovesLeft(number1 !== number2 ? 2 : 4);

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
