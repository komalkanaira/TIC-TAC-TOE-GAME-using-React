import { useState } from "react";

export default function Gameboard({ onSelectsquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row.map((playersymbol, colindex) => (
              <li key={colindex}>
                <button
                  onClick={() => onSelectsquare(rowindex, colindex)}
                  disabled={playersymbol !== null}
                >
                  {playersymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}