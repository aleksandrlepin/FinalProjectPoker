import React from 'react';
import { socket } from '../../constants/consts';

export default class VoutingCard extends React.Component {

    handleChoiceNumber = () => {
        this.props.onClick(this.props.number);
        socket.emit('transferNumber', this.props.number);
    }

    render() {
        return (
            <div className="buttons__card-block" onClick={this.handleChoiceNumber}>
                <span className="buttons__card-item">{this.props.number}</span>
            </div>
        )

    }
}
