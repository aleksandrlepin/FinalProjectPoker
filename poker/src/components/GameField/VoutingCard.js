import React from 'react';
import { socket } from '../../constants/consts';
import openSocket from 'socket.io-client';
import './voutingCard.css';

export default class VoutingCard extends React.Component {

    handleChoiceNumber = (number) => {
        console.log(number);
        // socket.broadcast.emit('transferNumber', number);
        socket.emit('transferNumber', number);
        // chooseNumber(number);
    }
    render() {
        return (
            <div className='voutingCard' onClick={this.handleChoiceNumber.bind(null, this.props.number)}>
                {this.props.number}
            </div>
        )

    }
}