import React from 'react';
import './index.css';
// import headerBg from'./header-bg.png';



export default class Footer extends React.Component {

    render() {
        return (
            <footer class="footer">
                <a href="https://goit.ua" class="footer__link-team">
                    GoIt 2018
                </a>
                <a href="#" class="footer__link-team">
                    Bootcamp #3 team
                </a>
            </footer>
        )
    }
}
