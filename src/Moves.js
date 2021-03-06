import React from 'react';
import useGame from './useGame.js';

const Moves = props => {
  const { history, stepNumber, jumpTo } = useGame();
    
  const moves = history.map((step, move) => {
    const col = (step.lastSquare % 3);
    const row = Math.floor(step.lastSquare / 3);
    const moveButtonText = move ? `Go to move ${move} (${col},${row})` : 'Go to game start';
    const isCurrentMove = (move === stepNumber);

    return (
      <li key={move}>
        <button 
          className={isCurrentMove ? 'current-move' : ''}
          onClick={() => jumpTo(move)}>
          {moveButtonText}
        </button>
      </li>
    );
  });

  const sortedMoves = props.ascOrder ? moves : moves.reverse();

  return (
    <ol>{sortedMoves}</ol>
  );
}

export default Moves;