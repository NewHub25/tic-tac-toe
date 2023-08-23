import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { audioClick, audioSurprise, audioNewGame, audioWinner } from "./music";

function App() {
  console.log("render");
  const [board, setBoard] = useState(() => {
    // Los hooks no pueden estar anidados 👀
    console.log("inicializando estado del tablero");
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

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
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
