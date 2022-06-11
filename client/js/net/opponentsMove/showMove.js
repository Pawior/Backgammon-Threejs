import {
  getYOffsetMove,
  getYOffsetCapture,
  captureChecker,
} from "../../game/clickHandlers/triangleClickHandler.js";

export default function showMove(
  move,
  checkersData,
  checkerModels,
  checkerWidth,
  checkerMargin,
  fieldsPositions
) {
  let checkerToMove = checkerModels.filter(
    (checker) => checker.getMyId() === move.id
  )[0];
  let yOffset;

  const fieldLevel = move.newPosition.index > 12 ? 2 : 1;
  if (move.type === "move") {
    yOffset = getYOffsetMove(
      fieldLevel,
      checkersData,
      move.newPosition.index,
      checkerWidth,
      checkerMargin
    );
  } else if (move.type === "capture") {
    yOffset = getYOffsetCapture(fieldLevel, checkerWidth);

    captureChecker(
      move.newPosition.index,
      checkersData,
      checkerModels,
      checkerWidth,
      checkerMargin
    );

    const fieldPosition = fieldsPositions[move.newPosition.index - 1];

    const moveTo = { x: fieldPosition.x, z: fieldPosition.z + yOffset };

    moveChecker(checkerToMove, moveTo);
  }
}
