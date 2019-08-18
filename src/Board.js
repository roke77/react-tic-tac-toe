import React from 'react';
import Square from './Square.js';

const Board = props => {
  const renderSquare = i => {
    const isWinner = props.winnerLine && props.winnerLine.includes(i);
    return (
      <Square
        key={i}
        value={props.squares[i]}
        isWinner={isWinner}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const renderRow = i => {
    const row = [i,i+1,i+2].map((value) => renderSquare(value));
    return(
      <div
        key={i}
        className="board-row">
        {row}
      </div>
    );
  }

  const board = [0,3,6].map((value) => renderRow(value));

  return (
    <div>{board}</div>
  );
}

export default Board;