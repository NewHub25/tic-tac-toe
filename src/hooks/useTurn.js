import { useState } from "react";
import { TURNS } from "../constants";

export const useTurn =()=>{
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  return {turn, setTurn}
}