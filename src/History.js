import React from 'react';
import Moves from './Moves.js';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascOrder: true,
    };
  }

  handleClick() {
    this.setState({
      ascOrder: !this.state.ascOrder,
    });
  }

  render() {
    const sortButtonText = this.state.ascOrder ? 'Sort DESC' : 'Sort ASC';

    return (
      <div>
        <button
          onClick={() => this.handleClick()}>
          {sortButtonText}
        </button>
        <Moves
          ascOrder={this.state.ascOrder}
          history={this.props.history}
          stepNumber={this.props.stepNumber}
          jumpTo={(step) => this.props.jumpTo(step)}
        />
      </div>
    );
  }
}

export default History;