import React from 'react';
import { socket } from '../../constants/consts';

export default class Question extends React.Component {

    handleChangeQuestion = () => {
        // this.props.currentQuestion(+this.props.index);
        // socket.emit('transferQuestion', +this.props.index);
    }

    render() {
        return (
            <div className="questions__item"  onClick={this.handleChangeQuestion}>
                <span className="questions__item-number">{this.props.index}</span>
                <span className="questions__item-text"> {this.props.question}</span>
                <span className="questions__item-count">{this.props.answer}</span>
            </div>

            // <div className={this.props.className} onClick={this.handleChangeQuestion}>
            //     <div className="question-number vertical-center"> {this.props.index}</div>
            //     <div className="question-text vertical-center"> {this.props.question}</div>
            //     <div className="question-score vertical-center"> {this.props.answer}</div>
            // </div>
        )

    }
}
