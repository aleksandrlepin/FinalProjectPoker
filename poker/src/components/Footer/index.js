import React from 'react';
// import './index.css';

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <a href="https://goit.ua" className="footer__link-team">
                    GoIt 2018
                </a>
                <a className="footer__link-team">
                    Bootcamp #3 team
                </a>
            </footer>
        )
    }
}
