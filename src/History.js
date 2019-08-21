import React, {useState} from 'react';
import Moves from './Moves.js';

const History = props => {
  const [ascOrder, setAscOrder] = useState(true);
  const sortButtonText = ascOrder ? 'Sort DESC' : 'Sort ASC';

  return(
    <div>
      <button
        onClick={() => setAscOrder(!ascOrder)}>
        {sortButtonText}
      </button>
      <Moves ascOrder={ascOrder} />
    </div>
  );
}

export default History;