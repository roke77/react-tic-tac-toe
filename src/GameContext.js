import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameContextProvider = props => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });
  
  return(
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider }
