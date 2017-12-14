import React from 'react';
import { withRouter } from 'react-router-dom';
import store from './GameField/store/index';
import { socket } from '../constants/consts';

class Login extends React.Component {
    constructor(props) {
        super(props);
       
    }
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
            localStorage.setItem('useremail', JSON.stringify(res.email));

        })
        .catch(err => console.log(err));
        console.log(localStorage.getItem('currentGameId'))
        this.props.history.push(`play/game/${localStorage.getItem('currentGameId')}`);
        this.callSocket();
    }
    callSocket = () =>  {
        console.log('callSocket')
        socket.emit('add owner', JSON.parse(localStorage.getItem('username')));
    };

    render() {
        // console.log(JSON.parse(localStorage.getItem('currentGameId')))
        return (
            <div className="container-for-register-form">
                <h4>Login</h4>
                <form>
                    <label className="register-form-label">Email:</label>
                    <input ref="email" type="email" name="name" placeholder="@email" />
                    <label className="register-form-label">Password:</label>
                    <input ref="password" type="password" name="name" placeholder="******" />
                    <p className="log-warning">You must log in to join a game that you own.</p>
                   
                    <div className="register-form-submit" onClick={this.handleLogIn}>Log in</div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)