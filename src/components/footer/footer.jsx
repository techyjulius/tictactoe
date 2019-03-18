import React from 'react';
import './footer.scss';

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="container container--center-content">{props.children}</div>
        </footer>
    );
}

export default Footer;