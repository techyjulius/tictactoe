import React, { Component } from 'react';
import './board.scss';

class Board extends Component {
    state = {
        filled: false
    }

    render() {
        return (
            <div className="board">
                {this.props.children}
            </div>
        );
    }
}

export default Board;