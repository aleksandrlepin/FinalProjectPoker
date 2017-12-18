import React from 'react';
import { socket } from '../../constants/consts';
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
            vouted: this.props.user.answers[0] ? true : false,
            opened: false,
            vout: this.props.user.answers[0] ? this.props.user.answers[0] : null, 
            activeQuestion: 1
        }
      
        let userName = this.props.user.name;
        let addToAnswers = this.props.addToAnswers
        let self = this;
        function checkUser (data) {
            if (userName === data.name) {
                self.setState({vouted: true, vout: data.number});
                addToAnswers(data.name, data.number)
            }
            if (data.number === 0) self.setState({vouted: false});
        }

        socket.on('clearCards', () => {
            this.setState({vout: 0});
            this.setState({vouted: false});
        })

        socket.on('renderNumber', (data) => checkUser(data)) ;

        socket.on('renderQuestion', (index) => {
            this.setState({activeQuestion: index.index});
            this.setState({vout: this.props.user.answers[this.state.activeQuestion-1]});
            if (this.props.user.answers[this.state.activeQuestion-1]) {
                this.setState({vouted: true});
             } else {       
                this.setState({vouted: false});
             }  
        })
    }
 
    render() {     
        console.log(this.state.activeQuestion, this.state.vouted, this.state.vout) 
        return (
            <div className="wrapper-for-user-card" style={this.state.vouted ? stylesWrapper : null}>
                <div className="user-card" style={!this.state.vouted ? stylesClosed: stylesVouted}></div>
                <div className="user-vout">{this.state.vout ? this.state.vout : null}</div>
                <p className="user-card-name">{this.props.user.name}</p>
            </div>
        )
    }
}