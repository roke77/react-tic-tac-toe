import React from 'react';
import Board from './Board.js';

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
      ascOrder: true,
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

  handleSortClick() {
    this.setState({
      ascOrder: !this.state.ascOrder,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winnerLine = calculateWinnerLine(current.squares);
    const isDraw = !current.squares.some(element => element === null);

    let status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    if (winnerLine)
      status = `Winner: ${this.state.xIsNext ? 'O' : 'X'}`;
    if (isDraw)
      status = "The match is a DRAW!";

    const moves = history.map((step, move) => {
      const col = (step.lastSquare % 3);
      const row = Math.floor(step.lastSquare / 3);
      const moveButtonText = move ? `Go to move ${move} (${col},${row})` : 'Go to game start';
      const isCurrentMove = (move === this.state.stepNumber);
      return (
        <li key={move}>
          <button 
            className={isCurrentMove ? 'current-move' : ''} 
            onClick={() => this.jumpTo(move)}>
            {moveButtonText}
          </button>
        </li>
      );
    });

    const sortButtonText = this.state.ascOrder ? 'Sort DESC' : 'Sort ASC';
    const sortedMoves = this.state.ascOrder ? moves : moves.reverse();

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
          <div>{status}</div>
          <button
            onClick={() => this.handleSortClick()}>
            {sortButtonText}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;