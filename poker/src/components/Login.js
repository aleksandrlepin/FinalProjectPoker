import React from 'react';
import { withRouter } from 'react-router-dom';
import LogError from './LogError';
import '../index.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: true}
    }

    handleLogIn = () => {
        let profile = JSON.stringify({
            email: this.refs.email.value,
            password: this.refs.password.value
        })
        fetch(`/login`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: profile })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem('username', JSON.stringify(res.name));
            localStorage.setItem('useremail', JSON.stringify(res.email));
            localStorage.setItem('isOwner', true);
            this.props.history.push('/dashboard');
            
        })
        .catch(err => {
            this.setState({logged: false})
            console.log('login error');
            console.log(err)});
    }

    render() {
        return (
            <div className="container-for-login-form">
                <LogError condition={this.state.logged} />
                <h4>Login</h4>
                <form>
                    <label className="register-form-label">Email:</label>
                    <input className="register-input" ref="email" type="email" name="name" placeholder="@email" />
                    <label className="register-form-label">Password:</label>
                    <input className="register-input" ref="password" type="password" name="name" placeholder="******" />
                   
                    <div className="register-form-submit" onClick={this.handleLogIn}>Log in</div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)