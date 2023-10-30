import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/winner-modal.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import {
  audioClick,
  audioSurprise,
  audioNewGame,
  audioWinner,
} from "./music.js";
import { useTurn } from "./hooks/useTurn.js";
import { useBoard } from "./hooks/useBoard.js";
import AvatarDialog from "./components/dialog.jsx";
import { useSnackbar } from "notistack";

function App() {
  const { board, setBoard } = useBoard();
  const { turn, setTurn } = useTurn();
  const [winner, setWinner] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar("Dando click sobre los emojis puedes cambiarlos", {
      preventDuplicate: true,
      persist: true,
      variant: "ringAlert",
    });
  }, []);

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    // Actualizar el tablero
    newBoard[index] = turn;
    setBoard(newBoard);
    audioClick.play();
    // Cambiar el turno
    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O;
    setTurn(newTurn);
    //Guardar tablero y partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    // Revisar si hay ganador del turno
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti({ particleCount: 100, spread: 60 });
      setWinner(newWinner);
      audioWinner.play();
      navigator.vibrate(200);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      audioSurprise.play();
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    audioNewGame.play();
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>3 en raya</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} handleClick={() => updateBoard(index)}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square
          isSelected={turn === TURNS.X}
          handleClick={(e) => e.currentTarget.nextElementSibling.showModal()}
        >
          {TURNS.X}
        </Square>
        <AvatarDialog player={"X"} setBoard={setBoard} setTurn={setTurn} />
        <Square
          isSelected={turn === TURNS.O}
          handleClick={(e) => e.currentTarget.nextElementSibling.showModal()}
        >
          {TURNS.O}
        </Square>
        <AvatarDialog player={"O"} setBoard={setBoard} setTurn={setTurn} />
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
