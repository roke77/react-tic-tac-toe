import React from 'react';
import useGame from './useGame.js';

const Square = props => {
  const { currentSquares, winnerLine, handleClick } = useGame();
  const isWinner = winnerLine && winnerLine.includes(props.index);
  const buttonText = currentSquares[props.index];

  return (
    <button
      className={`square ${isWinner ? 'winner' : ''}`}
      onClick={() => handleClick(props.index)}>
      {buttonText}
    </button>
  );
}

export default Square;