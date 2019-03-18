import React from 'react';
import './header.scss';

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="container container--center-content">
                {props.children}
            </h1>
        </header>
    );
}

export default Header;