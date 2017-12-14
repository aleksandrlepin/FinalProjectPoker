import React from 'react';
import '../registration.css';

export default class Registration extends React.Component {
    
    state = {
        name : '',
        email : '',
        password : '',
        repeatPassword : ''
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        if (this.state.password == this.state.repeatPassword) {
            let data = this.state
            delete data.repeatPassword
            fetch('/registeruser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
                // .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err));
            console.log("------------------------  fetch RUUUUN");
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { name, email, password, repeatPassword } = this.state
        return (
            <div className="container-for-register-form">
                <form>
                    <label className="register-form-label">Player name:</label>
                    <input type="text" name="name" onChange={this.handleChange} />
                    <label className="register-form-label">Email:</label>
                    <input type="email" name="email" onChange={this.handleChange} />
                    <label className="register-form-label">Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    <label className="register-form-label">Repeat password:</label>
                    <input type="password" name="repeatPassword" onChange={this.handleChange} />
                    <input className="register-form-submit" id="buttonSubmit" type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}