import { useContext } from 'react';
import { GameContext } from "./GameContext";
import { calculateWinnerLine } from './Utils.js';

const useGame = () => {
  const [state, setState] = useContext(GameContext);
  const { history, stepNumber, xIsNext } = state;

  const currentSquares = () => {
    return history[stepNumber].squares;
  }

  const currentPlayer = () => {
    return xIsNext ? 'O' : 'X';
  }

  const nextPlayer = () => {
    return xIsNext ? 'X' : 'O';
  }

  const winner = calculateWinnerLine(currentSquares());
  const winnerLine = () => {
    return winner;
  }

  const isFull = () => {
    return !currentSquares().some(square => square === null);
  }

  const isDraw = () => {
    return isFull() && !winner;
  }

  const jumpTo = step => {
    setState(state => ({
      ...state,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    }));
  }

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const current = slicedHistory[slicedHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinnerLine(squares) || squares[i]) return;

    squares[i] = nextPlayer();

    setState(state => ({
      ...state,
      history: slicedHistory.concat([{
        squares: squares,
        lastSquare: i,
      }]),
      stepNumber: slicedHistory.length,
      xIsNext: !xIsNext,
    }));
  }

  return { history, stepNumber, currentSquares, currentPlayer, nextPlayer, winnerLine, isFull, isDraw, jumpTo, handleClick }
};

export default useGame;