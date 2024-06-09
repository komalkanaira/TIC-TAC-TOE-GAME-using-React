export default function Gameover({ winner ,onRestart}) {
    return (
      <ol id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won</p>}
        {!winner && <p>It&apos; is a draw</p>}
        <button onClick={onRestart}>Rematch</button>
      </ol>
    );
  }