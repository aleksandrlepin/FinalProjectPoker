import React from 'react';
import './index.css';
// import headerBg from'./header-bg.png';



export default class Footer extends React.Component {
    
    render() {
        return (
            <footer>
                <div className="footerLeft">
                    <p>&#9400; www.covrishki.com</p>
                </div>
                <div className="footerRigth">
                    <p>Bootcamp #3 team</p>
                </div>
            </footer>
        )
    }
}