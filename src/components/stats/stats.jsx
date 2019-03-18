import React from 'react';
import './stats.scss';

const Stats = (props) => {
    return (
        <div className="stats">
            <div className="stats__inner-container">
                <div className={'player player--' + props.players.X.color}>PLAYER [ { props.players.X.identifier } ]</div>
                <div>{ props.players.X.winsCount }</div>
            </div>
            <div className="stats__inner-container">
                <div className="player">TIE</div>
                <div>{ props.tiesCount }</div>
            </div>
            <div className="stats__inner-container">
                <div className={'player player--' + props.players.O.color}>PLAYER [ { props.players.O.identifier } ]</div>
                <div>{ props.players.O.winsCount }</div>
            </div>
        </div>
    );
}

export default Stats;