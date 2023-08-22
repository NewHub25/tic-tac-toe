import { WINNER_COMBOS } from "./../constants";
export const checkWinnerFrom = (BoardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      BoardToCheck[a] &&
      BoardToCheck[a] === BoardToCheck[b] &&
      BoardToCheck[a] === BoardToCheck[c]
    ) {
      return BoardToCheck[a]; //x u o
    }
  }
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
