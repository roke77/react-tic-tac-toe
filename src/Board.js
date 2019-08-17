import React from 'react';
import Square from './Square.js';

class Board extends React.Component {
  renderSquare(i) {
    const isWinner = this.props.winnerLine && this.props.winnerLine.includes(i);
    return (
      <Square
        value={this.props.squares[i]}
        isWinner={isWinner}
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

export default Board;