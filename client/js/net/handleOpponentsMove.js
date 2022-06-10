import showMove from "./net/opponentsMove/showMove.js";
import updateData from "./net/opponentsMove/updateData.js";

export default handleOpponetsMove = () => {
  updateData(opponentsMove, this.checkers, this.checkerModels);
  showMove(
    opponentsMove,
    this.checkers,
    this.checkerModels,
    this.checkerWidth,
    this.checkerMargin,
    this.fieldsPositions
  );
};
