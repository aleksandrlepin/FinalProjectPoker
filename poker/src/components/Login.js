import React from 'react';
import { withRouter } from 'react-router-dom';
import store from './GameField/store/index';

class Login extends React.Component {

    handleLogIn = () => {
        console.log('click login')
        let profile = JSON.stringify({
            email: this.refs.email.value,
            password: this.refs.password.value
        })
        fetch(`/login`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: profile })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem('username', JSON.stringify(res.name));
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container-for-register-form">
                <form>
                  
                    <label className="register-form-label">Email:</label>
                    <input ref="email" type="text" name="name" />
                    <label className="register-form-label">Password:</label>
                    <input ref="password" type="text" name="name" />
                   
                    <div className="register-form-submit" onClick={this.handleLogIn}>Log in</div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)