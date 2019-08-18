import React, {useState} from 'react';
import Board from './Board.js';
import History from './History.js';
import Info from './Info.js';

const calculateWinnerLine = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winnerLine = lines.find((line) => {
    const [a, b, c] = line;
    return (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]);
  });
  return winnerLine;
}

const Game = props => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinnerLine(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistory(
      newHistory.concat([{
        squares: squares,
        lastSquare: i,
      }])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const current = history[stepNumber];
  const winnerLine = calculateWinnerLine(current.squares);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winnerLine={winnerLine}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <Info
          squares={current.squares}
          winnerLine={winnerLine}
          xIsNext={xIsNext}
        />
      </div>
      <div className="game-history">
        <History
          history={history}
          stepNumber={stepNumber}
          jumpTo={(step) => jumpTo(step)}
        />
      </div>
    </div>
  );
}

export default Game;