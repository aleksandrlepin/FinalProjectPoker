import React from 'react';
import { withRouter } from 'react-router-dom';

class LogError extends React.Component {

    handleRegister = () => {
        this.props.history.push('/registration');
    }

    render() {
        console.log(this.props.condition);
        return (
            <div className="log-warning">
                {this.props.condition ?
                    null :
                    <p>
                    <span>Something wrong with login. Try again or</span>
                    <span className="register" onClick={this.handleRegister}> register </span>
                    </p>}
            </div>

        )


    }
}


export default withRouter(LogError)