export default function updateData(opponentsMove, checkersData, checkerModels) {
  for (let i = 0; i < checkersData.length; i++) {
    if (checkersData[i].id === opponentsMove.id) {
      checkersData[i].position.isOnBar = opponentsMove.newPosition.isOnBar;
      checkersData[i].position.index = opponentsMove.newPosition.index;
      checkersData[i].position.level = opponentsMove.newPosition.level;
      checkersData[i].isOutOfGame = opponentsMove.isOutGame;
      break;
    }
  }

  for (let i = 0; i < checkerModels.length; i++) {
    if (checkerModels[i].getMyId() === opponentsMove.id) {
      checkerModels[i].setIsOnBar(opponentsMove.newPosition.isOnBar);
      checkerModels[i].setIndex(opponentsMove.newPosition.index);
      checkerModels[i].setLevel(opponentsMove.newPosition.level);
      checkerModels[i].setIsOutOfGame(opponentsMove.isOutOfGame);

      break;
    }
  }
}
