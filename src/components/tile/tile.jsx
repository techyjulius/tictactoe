import React, { Component } from 'react';
import './tile.scss';

class Tile extends Component {
    render() {
        return (
            <div className={'tile ' + this.props.additionalClasses}
                 onClick={e => this.props.onTileClick(e)}
                 data-index={this.props.dataIndex}>{this.props.playerOccupying}</div>
        );
    }
}

export default Tile;