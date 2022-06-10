export default function updateData(opponentsMove, checkersData, checkerModels) {
  for (let i = 0; i < checkersData.length; i++) {
    if (checkersData[i].id === opponentsMove.id) {
      checkersData[i].position.isOnBar = opponentsMove.position.isOnBar;
      checkersData[i].position.index = opponentsMove.position.index;
      checkersData[i].position.level = opponentsMove.position.level;
      checkersData[i].isOutOfGame = opponentsMove.isOutOfGame;

      break;
    }
  }

  for (let i = 0; i < checkerModels.length; i++) {
    if (checkerModels[i].getMyId() === opponentsMove.id) {
      checkerModels[i].setIsOnBar(opponentsMove.position.isOnBar);
      checkerModels[i].setIndex(opponentsMove.position.index);
      checkerModels[i].setLevel(opponentsMove.position.level);
      checkerModels[i].setIsOutOfGame(opponentsMove.isOutOfGame);

      break;
    }
  }
}
