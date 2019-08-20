import React from 'react';

const Info = props => {
  const isFull = !props.squares.some(square => square === null);
  const isDraw = isFull && !props.winnerLine;

  let status = `Next player: ${(props.xIsNext ? 'X' : 'O')}`;

  if (props.winnerLine)
    status = `Winner: ${props.xIsNext ? 'O' : 'X'}`;
  else if (isDraw)
    status = "The match is a DRAW!";

  return (
    <div>{status}</div>
  );
}

export default Info;