import React from 'react';
import { withRouter } from 'react-router-dom';
import LogError from './LogError';
// import '../index.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logged: true }
    }

    handleLogIn = (e) => {
        e.preventDefault();
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
                this.setState({ logged: false })
                console.log('login error');
                console.log(err)
            });
    }

    render() {
        return (
            <main className="login">
                <section className="login__case">
                    <LogError condition={this.state.logged} />
                    <h1 className="login__title">Log in</h1>
                    <form className="form" action="#">
                        <label htmlFor="mail" className="form__title">Email</label>
                        <input id="mail" ref="email" className="form__input" type="mail" name="email" placeholder="email@gmail.com" />
                        <label htmlFor="passw" className="form__title">Password</label>
                        <input id="passw" ref="password" className="form__input" type="password" name="password" placeholder="&bull; &bull; &bull; &bull; &bull; &bull;" />
                        <button className="form__btn" onClick={this.handleLogIn}>Log in</button>
                    </form>
                </section>
            </main>

            // <div className="wrapper-login">
            //     <div className="container-for-login-form">
            //         <LogError condition={this.state.logged} />
            //         <h4>Login</h4>
            //         <form>
            //             <label className="register-form-label">Email:</label>
            //             <input className="register-input" ref="email" type="email" name="name" placeholder="@email" />
            //             <label className="register-form-label">Password:</label>
            //             <input className="register-input" ref="password" type="password" name="name" placeholder="******" />

            //             <div className="register-form-submit" onClick={this.handleLogIn}>Log in</div>
            //         </form>
            //     </div>
            // </div>
                    )
    }
}

export default withRouter(Login)
