import { setMeshColor } from "../../utils.js";

function handleTriangleClick(
  object,
  availableMoves,
  checkersData,
  selectedChecker,
  checkerWidth,
  checkerMargin,
  changeCheckerPosition,
  checkersModels,
  setAvailableMoves,
  isClickingAllowed,
  setIsClickingAllowed,
  checkAndHandleFinishingPhase
) {
  if (!isClickingAllowed) return;
  setIsClickingAllowed(false);

  const field = object.parent;

  if (!availableMoves || !selectedChecker) {
    console.error("checker not selected");
    setIsClickingAllowed(true);
    return;
  }

  for (const move of availableMoves) {
    const fieldIndex = field.getIndex();

    if (fieldIndex !== move.index) continue;
    setAvailableMoves([]);

    let moveTo;
    const fieldPosition = field.getMyPosition();

    if (move.type === "move") {
      const yOffset = getYOffsetMove(
        field.getLevel(),
        checkersData,
        field.getIndex(),
        checkerWidth,
        checkerMargin
      );

      moveTo = { x: fieldPosition.x, z: fieldPosition.z + yOffset };
    } else if (move.type === "capture") {
      const yOffset = getYOffsetCapture(field.getLevel(), checkerWidth);
      moveTo = { x: fieldPosition.x, z: fieldPosition.z + yOffset };

      captureChecker(
        fieldIndex,
        checkersData,
        checkersModels,
        checkerWidth,
        checkerMargin
      );
    }

    moveChecker(selectedChecker, moveTo);

    // saving new checker data

    const newCheckerLevel = getNewCheckerLevel(checkersData, fieldIndex);
    changeCheckerPosition(
      selectedChecker.getMyId(),
      fieldIndex,
      newCheckerLevel
    );

    selectedChecker.setIndex(fieldIndex);
    selectedChecker.setLevel(newCheckerLevel);

    if (selectedChecker.getIsOnBar()) {
      selectedChecker.setIsOnBar(false);
    }

    checkAndHandleFinishingPhase(
      selectedChecker.getColorNumber(),
      checkersData
    );
  }

  setIsClickingAllowed(true);
}

function getYOffsetMove(
  fieldLevel,
  checkersData,
  fieldIndex,
  checkerWidth,
  checkerMargin
) {
  const checkersOnField = checkersData.filter(
    (checkerData) =>
      checkerData.position.index === fieldIndex && !checkerData.position.isOnBar
  );

  if (fieldLevel === 1) {
    // Color;
    return (
      checkersOnField.length * (checkerWidth + checkerMargin) + checkerWidth / 2
    );
  } else {
    return -(
      checkersOnField.length * (checkerWidth + checkerMargin) +
      checkerWidth / 2
    );
  }
}

function getYOffsetCapture(fieldLevel, checkerWidth) {
  return fieldLevel === 1 ? checkerWidth / 2 : -checkerWidth / 2;
}

function captureChecker(
  fieldIndex,
  checkersData,
  checkersModels,
  checkerWidth,
  checkerMargin
) {
  // const checkerToCaptureData = checkers.filter(
  //   (checker) => checker.position.index === fieldIndex && !checkerData.position.isOnBar
  // )[0];

  const checkerToCapture = checkersModels.filter(
    (checker) => checker.getIndex() === fieldIndex && !checker.getIsOnBar()
  )[0];

  const moveTo = getNewPositionOnBar(
    checkersData,
    checkerToCapture.getColorNumber(),
    checkerWidth,
    checkerMargin
  );

  const checkersOnBar = checkersData.filter(
    (checker) =>
      checker.position.isOnBar &&
      checker.color === checkerToCapture.getColorNumber()
  );

  // changing data in checkers array
  for (let i = 0; i < checkersData.length; i++) {
    if (checkersData[i].position.index === fieldIndex) {
      checkersData[i].position.isOnBar = true;
      checkersData[i].position.index = checkersOnBar.length + 1;
      checkersData[i].position.level = checkerToCapture.getColorNumber();
    }
  }

  // changing data in checker object (mesh)
  checkerToCapture.setIsOnBar(true);
  checkerToCapture.setIndex(checkersOnBar.length + 1);
  checkerToCapture.setLevel(checkerToCapture.getColorNumber());

  moveChecker(checkerToCapture, moveTo);
}

function getNewPositionOnBar(
  checkersData,
  checkerColor,
  checkerWidth,
  checkerMargin
) {
  const barLevel = checkerColor;

  const checkersOnBar = checkersData.filter(
    (checker) => checker.position.isOnBar && checker.position.level === barLevel
  );

  const zColorOne =
    checkersOnBar.length * (checkerWidth + checkerMargin) + checkerWidth / 2;
  const zColorTwo = -zColorOne;

  return { x: 0, z: checkerColor === 1 ? zColorOne : zColorTwo };
}

function moveChecker(checker, to) {
  setMeshColor(checker, checker.getStandardColor());

  // code from https://github.com/tweenjs/tween.js/ and learningthreejs.com
  let checkerPosition = {
    x: checker.position.x,
    z: checker.position.z,
  };

  new TWEEN.Tween(checkerPosition)
    .to(to, 700)
    .easing(TWEEN.Easing.Quintic.Out)
    .onUpdate(() => {
      checker.position.x = checkerPosition.x;
      checker.position.z = checkerPosition.z;
    })
    .start();
}

function getNewCheckerLevel(checkersData, fieldIndex) {
  const chekersOnField = checkersData.filter(
    (checker) =>
      checker.position.index === fieldIndex && !checker.position.isOnBar
  );
  return chekersOnField.length + 1;
}

export { handleTriangleClick, moveChecker };
