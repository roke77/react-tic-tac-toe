import React from 'react';
import Board from './Board.js';
import Info from './Info.js';
import History from './History.js';
import { GameContextProvider } from './GameContext.js';

const Game = props => {
  return (
    <GameContextProvider>
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
          <div className="game-info">
            <Info/>
          </div>
        <div className="game-history">
          <History/>
        </div>
      </div>
    </GameContextProvider>
  );
}

export default Game;