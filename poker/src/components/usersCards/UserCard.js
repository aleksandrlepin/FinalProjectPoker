import React from 'react';
import { socket } from '../../constants/consts';
import openSocket from 'socket.io-client';
import './usersCards.css';
import bgBlue from './images/bg_userCard-blue.png';
import bgWhite from './images/bg_userCard-white.png';

let stylesClosed = {
    backgroundImage: `url(${bgBlue})`   
}
let stylesVouted = {
    backgroundImage: `url(${bgWhite})`   
}
let stylesWrapper = {
    backgroundColor: '#ff6c00'   
}

export default class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vouted: false,
            opened: false,
            vout: null
        }
        
        let userName = this.props.user.name;
        let addToAnswers = this.props.addToAnswers
        let self = this;
        function checkUser (data) {
            if (userName === data.name) {
                self.setState({vouted: true, vout: data.number});
                addToAnswers(data.name, data.number)
                console.log('userName', userName,'useID', data._id, 'data.number', data.number)
                console.log(data)
            }
        }
        socket.on('renderNumber', (data) => checkUser(data)) ;
    }
 
    render() {
        return (
            <div className="wrapper-for-user-card" style={this.state.vouted ? stylesWrapper : null}>
                <div className="user-card" style={!this.state.vouted ? stylesClosed: stylesVouted}></div>
                <div className="user-vout">{this.state.vout}</div>
                <p className="user-card-name">{this.props.user.name}</p>
            </div>
        )
    }
}