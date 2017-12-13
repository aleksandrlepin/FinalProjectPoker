import React from 'react';






export default class Registration extends React.Component {
    render() {
        return (
            <div className="container-for-register-form">
                <form>
                    <label className="register-form-label">First name:</label>
                    <input type="text" name="name" />
                    <label className="register-form-label">Last name:</label>
                    <input type="text" name="name" />
                    <label className="register-form-label">Player name:</label>
                    <input type="text" name="name" />
                    <label className="register-form-label">Email:</label>
                    <input type="text" name="name" />
                    <label className="register-form-label">Password:</label>
                    <input type="text" name="name" />
                   
                    <input className="register-form-submit" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}