import React from 'react';
import useGame from './useGame.js';

const Info = props => {
  const { currentPlayer, nextPlayer, winnerLine, isDraw } = useGame();

  let status = "";
  if (winnerLine)
    status = `Winner: ${currentPlayer()}`;
  else if (isDraw())
    status = "The match is a DRAW!";
  else
    status = `Next player: ${nextPlayer()}`;

  return (
    <div>{status}</div>
  );
}

export default Info;