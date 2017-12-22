import React from 'react';
import './index.css';
// import headerBg from'./header-bg.png';



export default class Footer extends React.Component {
    
    render() {
        return (
            <footer>
                <div className="footerLeft">
                    <span>&#9400; </span><a href="https://goit.ua" className="footer-link">https://goit.ua</a>
                </div>
                <div className="footerRigth">
                    <p>Bootcamp #3 team</p>
                </div>
            </footer>
        )
    }
}