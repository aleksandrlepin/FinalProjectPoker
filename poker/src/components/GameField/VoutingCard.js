import React from 'react';
import { socket } from '../../constants/consts';
import './voutingCard.css';



export default class VoutingCard extends React.Component {

    handleChoiceNumber = () => {
        this.props.onClick(this.props.number);
        socket.emit('transferNumber', this.props.number);     
    }
    
    render() {
        return (
            <div className={this.props.className} onClick={this.handleChoiceNumber}>
                {this.props.number}
            </div>
        )

    }
}