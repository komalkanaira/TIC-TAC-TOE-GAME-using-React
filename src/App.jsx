import React from "react";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/Winning-combinations.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Player from "./components/Playerinfo.jsx";
import Log from "./components/Log.jsx";
import Gameover from "./components/Gameover.jsx";

const Players = {
  X: "player1",
  O: "player2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveactiveplaer(gameturns) {
  let currplayer = "X";
  if (gameturns.length > 0 && gameturns[0].player == "X") {
    currplayer = "O";
  }
  return currplayer;
}
function deriveWinner(gameboard, players) {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstsquaresymbol =
      gameboard[combinations[0].row][combinations[0].column];
    const secondsquaresymbol =
      gameboard[combinations[1].row][combinations[1].column];
    const thirdsquaresymbol =
      gameboard[combinations[2].row][combinations[2].column];
    if (
      firstsquaresymbol &&
      firstsquaresymbol === secondsquaresymbol &&
      firstsquaresymbol === thirdsquaresymbol
    ) {
      winner = players[firstsquaresymbol];
    }
  }
  return winner;
}
function deriveGameboard(gameturns) {
  let gameboard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameturns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {
  // const [activeplayer, setActiveplayer] = useState("X");
  const [players, setPlayers] = useState(Players);
  const [gameturns, setGameturns] = useState([]);

  const activeplayer = deriveactiveplaer(gameturns);
  const gameboard = deriveGameboard(gameturns);
  const winner = deriveWinner(gameboard, players);

  const hasdraw = gameturns.length === 9 && !winner;
  function handleselectsquare(rowindex, colindex) {
    // setActiveplayer((curactiveplayer) => (curactiveplayer === "X" ? "O" : "X"));
    setGameturns((prevturns) => {
      const currplayer = deriveactiveplaer(prevturns);
      const updateturns = [
        { square: { row: rowindex, col: colindex }, player: currplayer },
        ...prevturns,
      ];
      return updateturns;
    });
  }
  function handlerematch() {
    setGameturns([]);
  }
  function handleplayerchange(symbol, newname) {
    setPlayers((prevplayer) => {
      return {
        ...prevplayer,
        [symbol]: newname,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={Players.X}
            symbol="X"
            isActive={activeplayer === "X"}
            onChnagename={handleplayerchange}
          />
          <Player
            name={Players.O}
            symbol="O"
            isActive={activeplayer === "O"}
            onChnagename={handleplayerchange}
          />
        </ol>
        {(winner || hasdraw) && (
          <Gameover winner={winner} onRestart={handlerematch} />
        )}
        <Gameboard onSelectsquare={handleselectsquare} board={gameboard} />
        <Log turns={gameturns} />
      </div>
    </main>
  );
}

export default App;