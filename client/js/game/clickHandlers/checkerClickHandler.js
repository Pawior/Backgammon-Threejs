import { setMeshColor } from "../../utils.js";
import { moveChecker } from "./triangleClickHandler.js";

function handlecheckerClick(
  checker,
  numbersThrown,
  checkersData,
  setSelectedChecker,
  setAvailableMoves,
  selectedCheckerColor,
  selectedChecker,
  isClickingAllowed,
  setIsClickingAllowed,
  isFinishingPhase,
  checkAndHandleWin
) {
  // console.log(checker.getIsOnisOnBar());
  // if (selectedChecker) {
  //   console.log(selectedChecker.getMyId());
  // }
  // console.log(checkersData);

  // console.log(
  //   checkersData.filter((c) => c.position.index === checker.getIndex())
  // );

  if (!isClickingAllowed) return;
  setIsClickingAllowed(false);

  if (!numbersThrown) {
    console.error("dice was not used");
    setIsClickingAllowed(true);
    return;
  }

  if (
    !isTopLevel(
      checker.getMyId(),
      checker.getIndex(),
      checkersData,
      checker.getIsOnBar()
    )
  ) {
    console.error("checker not on top");
    setIsClickingAllowed(true);
    return;
  }

  if (selectedChecker) {
    setMeshColor(selectedChecker, selectedChecker.getStandardColor());
  }

  setSelectedChecker(checker);
  setMeshColor(checker, selectedCheckerColor);

  let availableMoves = [];

  if (checker.getIsOnBar()) {
    availableMoves = findAvailableMovesFromBar(
      checker,
      numbersThrown,
      checkersData,
      setSelectedChecker
    );
  } else {
    availableMoves = findAvailableMoves(
      checker,
      numbersThrown,
      checkersData,
      isFinishingPhase,
      setSelectedChecker,
      checkAndHandleWin
    );
  }

  // console.log(availableMoves);

  setAvailableMoves(availableMoves);

  // console.log(availableMoves);

  setIsClickingAllowed(true);
}

function isTopLevel(checkerId, checkerIndex, checkersData, isOnBar) {
  let checkersOnField;

  if (!isOnBar) {
    checkersOnField = checkersData.filter(
      (checker) =>
        !checker.position.isOnBar &&
        !checker.isOutOfGame &&
        checker.position.index === checkerIndex
    );
  } else {
    checkersOnField = checkersData.filter(
      (checker) =>
        checker.position.isOnBar &&
        !checker.isOutOfGame &&
        checker.position.index === checkerIndex
    );
  }

  const checkersOnFieldSorted = checkersOnField.sort(
    (a, b) => b.position.level - a.position.level
  );

  // console.log(checkerId);

  return checkersOnFieldSorted[0].id === checkerId;
}

function findAvailableMoves(
  checker,
  numbersThrown,
  checkersData,
  isFinishingPhase,
  setSelectedChecker,
  checkAndHandleWin
) {
  // console.log(checkersData);

  let availableMoves = [];

  let numberChcecked;

  numbersThrown.forEach((number) => {
    if (numberChcecked === number) return; // when two numbers thrown are the same

    const color1IndexToCheck = checker.getIndex() + number;
    const color2IndexToCheck = checker.getIndex() - number;

    const indexToCheck =
      checker.getColorNumber() === 1 ? color1IndexToCheck : color2IndexToCheck;

    // handling bearing off

    if (isFinishingPhase) {
      // console.log(number);
      checkAndHandleBearingOff(
        checker,
        checkersData,
        number,
        availableMoves,
        setSelectedChecker,
        checkAndHandleWin
      );
    }

    // gettigng moves
    // console.log(indexToCheck);

    if (indexToCheck < 1 || indexToCheck > 24) return;

    const checkersOnField = checkersData.filter(
      (checkerData) =>
        checkerData.position.index === indexToCheck &&
        !checkerData.position.isOnBar
    );

    // console.log(checkersOnField);

    if (
      checkersOnField.length === 0 || // empty field
      (checkersOnField.length < 5 &&
        checkersOnField[0].color === checker.getColorNumber()) // field with the same color and less than 5 checkes
    ) {
      availableMoves.push({ type: "move", index: indexToCheck });
    } else if (
      checkersOnField.length === 1 &&
      checkersOnField[0].color !== checker.getColorNumber() // field with one opponent's checker
    ) {
      availableMoves.push({ type: "capture", index: indexToCheck });
    }

    numberChcecked = number;
  });

  return availableMoves;
}

function findAvailableMovesFromBar(
  checker,
  numbersThrown,
  checkersData,
  setSelectedChecker
) {
  let availableMoves = [];

  let numberChcecked;

  numbersThrown.forEach((number) => {
    if (numberChcecked === number) return; // when two numbers thrown are the same

    const color2IndexToCheck = 25 - number;
    const color1IndexToCheck = number;

    const indexToCheck =
      checker.getColorNumber() === 1 ? color1IndexToCheck : color2IndexToCheck;

    // gettigng moves

    const checkersOnField = checkersData.filter(
      (checkerData) =>
        checkerData.position.index === indexToCheck &&
        !checkerData.position.isOnBar
    );

    if (
      checkersOnField.length === 0 || // empty field
      (checkersOnField.length < 5 &&
        checkersOnField[0].color === checker.getColorNumber()) // field with the same color and less than 5 checkes
    ) {
      availableMoves.push({ type: "move", index: indexToCheck });
    } else if (
      checkersOnField.length === 1 &&
      checkersOnField[0].color !== checker.getColorNumber() // field with one opponent's checker
    ) {
      availableMoves.push({ type: "capture", index: indexToCheck });
    }

    numberChcecked = number;
  });

  return availableMoves;
}

function checkAndHandleBearingOff(
  checker,
  checkersData,
  number,
  availableMoves,
  setSelectedChecker,
  checkAndHandleWin
) {
  const color1Map = { 6: 19, 5: 20, 4: 21, 3: 22, 2: 23, 1: 24 };

  const indexToCheck =
    checker.getColorNumber() === 1 ? color1Map[number] : number;
  // console.log(indexToCheck);

  const checkersOnField = checkersData.filter(
    (checker) => checker.position.index === indexToCheck
  );
  const checkersOnFieldSorted = checkersOnField.sort(
    (a, b) => b.position.level - a.position.level
  );

  if (!checkersOnFieldSorted[0]) return;

  if (checker.getMyId() === checkersOnFieldSorted[0].id) {
    availableMoves.push({ type: "bearingOff", index: indexToCheck });
    // console.log(availableMoves);
    moveChecker(checker, { x: 40, z: 0 });

    // removing checker

    setSelectedChecker(undefined);

    let checkerToRemoveIndex;
    for (let i = 0; i < checkersData.length; i++) {
      if (checkersData[i].id === checker.getMyId()) {
        checkersData[i].position.index = null;
        checkersData[i].position.level = null;
        checkersData[i].outOfGame = true;
      }
    }

    checkAndHandleWin();

    // console.log(`checker data elements: ${checkersData.length} `);

    // console.log(`checker data elements: ${checkersData.length} `);

    checker.setIndex(null);
    checker.setLevel(null);
    checker.setIsOutOfGame(true);
  }
}

export { handlecheckerClick };
