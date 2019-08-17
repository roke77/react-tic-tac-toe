import React from 'react';

const Info = props => {
  const isDraw = !props.squares.some(element => element === null);

  let status = `Next player: ${(props.xIsNext ? 'X' : 'O')}`;
  if (props.winnerLine)
    status = `Winner: ${props.xIsNext ? 'O' : 'X'}`;
  if (isDraw)
    status = "The match is a DRAW!";

  return (
    <div> {status} </div>
  );
}

export default Info;