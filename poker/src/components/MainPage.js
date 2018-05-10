import React from 'react';
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
        )
    }
}
export default withRouter(MainPage);
