import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = props => {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  renderRow(i) {
    const row = [i,i+1,i+2].map((value) => this.renderSquare(value));
    return(
      <div
        className="board-row"
        key={i}>
        {row}
      </div>
    );
  }

  render() {
    const board = [0,3,6].map((value) => this.renderRow(value));
    return (
      <div>{board}</div>
    );
  }
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

    if (calculateWinner(squares) || squares[i]) return;

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
    const winner = calculateWinner(current.squares);

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
    const status = winner ? `Winner: ${winner}` : `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);