import React from 'react';
import { socket } from '../../constants/consts';

export default class Question extends React.Component {

    handleChangeQuestion = () => {
        this.props.currentQuestion(+this.props.index);
        socket.emit('transferQuestion', +this.props.index);
    }

    render() {
        return (
            <div className="questions__item"  onClick={this.handleChangeQuestion}>
                <span className="questions__item-number">{this.props.index}</span>
                <span className="questions__item-text"> {this.props.question}</span>
                <span className="questions__item-count">{this.props.answer}</span>
            </div>
        )
    }
}
