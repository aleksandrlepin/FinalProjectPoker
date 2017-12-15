import React from 'react';
import { withRouter } from 'react-router-dom';
import '../registration.css';


let validation = false;
class Registration extends React.Component {
    
    state = {
        name : '',
        email : '',
        password : '',
        repeatPassword : ''
    }
    
    handleSubmit = (e) => {
        // e.preventDefault();
        if (this.state.password != this.state.repeatPassword || !validation) {
            this.refs.repeatPassword.style.boxShadow = "0px 0px 2px 2px #ff0000";
            this.refs.password.style.boxShadow = "0px 0px 2px 2px #ff0000";
        } else {
            validation = false;
            this.refs.repeatPassword.style.boxShadow = "none";
            let data = this.state
            delete data.repeatPassword
            fetch('/registeruser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.name.length<3 || this.state.name.length>20) {
            this.refs.name.style.boxShadow = "0px 0px 2px 2px #ff0000";
            validation = false;
        } else {
            this.refs.name.style.boxShadow = "none";
            validation = true;
        }
        if (this.state.email.length<5 || this.state.email.length>20) {
            this.refs.email.style.boxShadow = "0px 0px 2px 2px #ff0000";
            validation = false;
        } else {
            validation = false;
            this.refs.email.style.boxShadow = "none";
            validation = true;
        }
        if (this.state.password.length<5 || this.state.password.length>20) {
            this.refs.password.style.boxShadow = "0px 0px 2px 2px #ff0000";
            validation = false;
        } else {
            this.refs.password.style.boxShadow = "none";
            validation = true;

        }
        if (this.state.repeatPassword && this.state.repeatPassword) {
            if (this.state.repeatPassword.length<5 || this.state.repeatPassword.length>20) {
                this.refs.repeatPassword.style.boxShadow = "0px 0px 2px 2px #ff0000";
                validation = false;
            } else {
                this.refs.repeatPassword.style.boxShadow = "none";
                validation = true;
            }
        }
    }


    render() {
        const { name, email, password, repeatPassword } = this.state
        return (
            <div className="container-for-register-form">
                    <label className="register-form-label">Player name:</label>
                    <input ref="name" type="text" name="name" onChange={this.handleChange} />
                    <label className="register-form-label">Email:</label>
                    <input ref="email" type="text" name="email" onChange={this.handleChange} />
                    <label className="register-form-label">Password:</label>
                    <input ref="password" type="password" name="password" onChange={this.handleChange} />
                    <label className="register-form-label">Repeat password:</label>
                    <input ref="repeatPassword" type="password" name="repeatPassword" onChange={this.handleChange} />
                    <input className="register-form-submit" type="submit" id="buttonSubmit" value="Submit" onClick={this.handleSubmit}/>
            </div>
        )
    }
}
export default withRouter(Registration);