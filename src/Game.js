import React, {useState} from 'react';
import Board from './Board.js';
import History from './History.js';
import Info from './Info.js';
import { calculateWinnerLine } from './Utils.js';

const Game = props => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const current = slicedHistory[slicedHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinnerLine(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistory(
      slicedHistory.concat([{
        squares: squares,
        lastSquare: i,
      }])
    );
    setStepNumber(slicedHistory.length);
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