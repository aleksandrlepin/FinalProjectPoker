import React from 'react';
import { withRouter } from 'react-router-dom';

let validation = false;
let emailValidation = false;
class Registration extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.repeatPassword || !validation) {
            this.refs.repeatPassword.style.boxShadow = "0px 0px 2px 2px #ff0000";
            this.refs.password.style.boxShadow = "0px 0px 2px 2px #ff0000";
        } else if (!emailValidation) {
            this.refs.email.style.boxShadow = "0px 0px 2px 2px #ff0000";
        } else {
            validation = false;
            emailValidation = false;
            this.refs.repeatPassword.style.boxShadow = "none";
            let data = this.state;
            delete data.repeatPassword
            console.log('data: ', data);
            // data.repeatPassword = '';
            fetch('/registeruser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log('res', res);
                    if (!res.emailValRes || !res.emailRes) {
                        this.refs.email.style.boxShadow = "0px 0px 2px 2px #ff0000";
                    } else {
                        this.refs.email.style.boxShadow = "none";
                    }
                    if (!res.name) {
                        this.refs.name.style.boxShadow = "0px 0px 2px 2px #ff0000";
                    } else {
                        this.refs.name.style.boxShadow = "none";
                    }
                    if (res.addedToDb) {
                        localStorage.setItem('token', JSON.stringify(res.token));
                        localStorage.setItem('username', JSON.stringify(res.name));
                        localStorage.setItem('useremail', JSON.stringify(res.email));
                        localStorage.setItem('isOwner', true);
                        this.props.history.push('/dashboard');
                    }
                })
                .catch(err => console.log(err));

            console.log("------------------------  fetch RUUUUN");
        }
        this.refs.password.value = '';
        this.refs.repeatPassword.value = '';
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.name.length < 3 || this.state.name.length > 20) {
            this.refs.name.style.boxShadow = "0px 0px 2px 2px #ff0000";
            validation = false;
        } else {
            this.refs.name.style.boxShadow = "none";
            validation = true;
        }
        if (this.state.email.length < 5 || this.state.email.length > 20 || !this.validateEmail(this.state.email)) {
            this.refs.email.style.boxShadow = "0px 0px 2px 2px #ff0000";
            emailValidation = false;
        } else {
            // validation = false;
            this.refs.email.style.boxShadow = "none";
            emailValidation = true;
        }
        if (this.state.password.length < 5 || this.state.password.length > 20) {
            this.refs.password.style.boxShadow = "0px 0px 2px 2px #ff0000";
            validation = false;
        } else {
            this.refs.password.style.boxShadow = "none";
            validation = true;

        }
        if (this.state.password && this.state.repeatPassword) {
            if (this.state.repeatPassword.length < 5 || this.state.repeatPassword.length > 20) {
                this.refs.repeatPassword.style.boxShadow = "0px 0px 2px 2px #ff0000";
                validation = false;
            } else {
                this.refs.repeatPassword.style.boxShadow = "none";
                validation = true;
            }
        }
        console.log('validation', validation);
    }


    render() {
        return (
            <main className="register">
                <div className="register__container-form-registation">
                    <form className="form" action="#">
                        <h1 className="form__title">
                            Register
                        </h1>
                        <div className="form__field">
                            <label className="form__label" htmlFor="name">Player name</label>
                            <input className="form__input" ref="name" onChange={this.handleChange} name="name" type="text" id="name" placeholder="name" required />
                        </div>
                        <div className="form__field">
                            <label className="form__label" htmlFor="email">Email</label>
                            <input className="form__input" ref="email" onChange={this.handleChange} name="email" type="email" id="email" placeholder="123@gmail.com" required />
                        </div>
                        <div className="form__field">
                            <label className="form__label" htmlFor="password">Password</label>
                            <input className="form__input" ref="password" onChange={this.handleChange} name="password" type="password" id="password" placeholder="Password" required />
                        </div>
                        <div className="form__field">
                            <label className="form__label" htmlFor="repeatPassword">Repeat password</label>
                            <input className="form__input" ref="repeatPassword" onChange={this.handleChange} name="repeatPassword" type="password" id="repeatPassword" placeholder="Repeat Password" required />
                        </div>
                        <div className="form__buttons">
                            <button className="form__continue-button" onClick={this.handleSubmit}>
                                Продолжить
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}
export default withRouter(Registration);
