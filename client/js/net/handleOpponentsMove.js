import showMove from "./opponentsMove/showMove.js";
import updateData from "./opponentsMove/updateData.js";

export default function handleOpponetsMove(
  opponentsMove,
  checkersData,
  checkerModels,
  checkerWidth,
  checkerMargin,
  fieldsPositions,
  checkAndHandleWin
) {
  showMove(
    opponentsMove,
    checkersData,
    checkerModels,
    checkerWidth,
    checkerMargin,
    fieldsPositions
  );
  updateData(opponentsMove, checkersData, checkerModels);
  checkAndHandleWin();
}
