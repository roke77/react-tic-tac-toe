import React from 'react';
import Board from './Board.js';
import History from './History.js';
import Info from './Info.js';

function calculateWinnerLine(squares) {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinnerLine(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastSquare: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winnerLine = calculateWinnerLine(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerLine={winnerLine}
            onClick={(i) => this.handleClick(i)}
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
            jumpTo={(step) => this.jumpTo(step)}
          />
        </div>
      </div>
    );
  }
}

export default Game;