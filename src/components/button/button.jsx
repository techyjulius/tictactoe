import React from 'react';
import './button.scss';

const Button = (props) => {
    return (
        <button className="button"
                onClick={(e) => props.onButtonClick(e)}>{props.children}</button>
    );
}

export default Button;