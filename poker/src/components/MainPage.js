import React from 'react';
// import './mainPage.css';
// import Header from './Header/Header';
import { withRouter } from 'react-router-dom';



class MainPage extends React.Component {
    render() {
        return (
            <main className="index">
                <div className="index__main">
                    <p className="index__text">
                        Complex tasks through simple ways.
                    </p>
                    <p className="index__text">
                        Play, deside, do!
                    </p>
                    <div className="index__container-button">
                        <button className="index__btn" onClick={() => {
                            this.props.history.push("/dashboard");
                        }}>
                            Start game
                        </button>
                    </div>
                </div>
            </main>

            // <div className="mainPage">
            //     <div className="mainPageContent">
            //         <div className="mainPageHeading">
            //             <h2>[Complex tasks through</h2>
            //             <h2>simple ways.</h2>
            //             <h2>Play, decide, do!_]</h2>
            //         </div>

            //         <button onClick={() => {
            //             this.props.history.push("/login");
            //         }}>Start game</button>
            //     </div>
            // </div>
        )
    }
}
export default withRouter(MainPage);
