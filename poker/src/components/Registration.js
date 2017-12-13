import React from 'react';

export default class Registration extends React.Component {
    
    state = {
        name : '',
        email : '',
        password : '',
        repeatPassword : ''
    }

    handleSubmit = () => {
        if (this.state.password == this.state.repeatPassword) {

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
                   
                    <input className="register-form-submit" type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}