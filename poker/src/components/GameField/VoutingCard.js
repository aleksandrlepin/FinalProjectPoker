import React from 'react';
import { socket } from '../../constants/consts';
import openSocket from 'socket.io-client';
import './voutingCard.css';



export default class VoutingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {voutingCardStyle: {}}
    }

    handleChoiceNumber = (number) => {
        console.log(number);
        this.setState({voutingCardStyle: {
            backgroundColor: '#00ffff',
            marginTop: '10px'
        }}) 
        // socket.broadcast.emit('transferNumber', number);
        socket.emit('transferNumber', number);
        // chooseNumber(number);
    }
    render() {
        return (
            <div style={this.state.voutingCardStyle} className='voutingCard' onClick={this.handleChoiceNumber.bind(null, this.props.number)}>
                {this.props.number}
            </div>
        )

    }
}