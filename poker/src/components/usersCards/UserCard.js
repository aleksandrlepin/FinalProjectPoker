import React from 'react';
import './usersCards.css';
import bg from './images/bg_userCard-blue.png';

let styles = {
    backgroundImage: `url(${bg})`
   
}

export default class UserCards extends React.Component {

    render() {

        return (
            <div className="wrapper-for-user-card">
                <div className="user-card" style={styles}></div>
                <p className="user-card-name">{this.props.user.name}</p>
            </div>
        )

    }
}