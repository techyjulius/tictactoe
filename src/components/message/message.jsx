import React, {Fragment} from 'react';
import {MESSAGE_PLAYER_TURN, MESSAGE_TIE, MESSAGE_WIN} from '../../constants/app-constants';
import './message.scss';

const Message = (props) => {
    let message = '';
    switch (props.details.type) {
        case MESSAGE_PLAYER_TURN:
            message = (
                <Fragment>
                    <span className={'message__highlight message__highlight--' + props.details.data.color}>
                        Player [ { props.details.data.player } ]</span> it's your turn to play
                </Fragment>
            );
            break;
        case MESSAGE_WIN:
            message = (
                <Fragment>
                    Congrats <span className={'message__highlight message__highlight--' + props.details.data.color}>
                        Player [ { props.details.data.player } ]</span>, you WON!
                </Fragment>
            );
            break;
        case MESSAGE_TIE:
            message = (
                <Fragment>This game was a tie</Fragment>
            );
            break;
        default:
            ;
    }

    return (
        <div className="message">{message}</div>
    );
}

export default Message;