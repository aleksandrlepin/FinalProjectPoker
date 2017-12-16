import React from 'react';
import { addQuestion } from './store/actions';
import store from './store/index';
import "./newQuestion.css";

export default class NewQuestion extends React.Component {
    constructor() {
        super();
    }

    saveQuestion = (event) => {
        event.preventDefault();
        let proverkaQuestions = true;
        // alert(this.refs.inputNewQuestion.value);
        if (this.refs.inputNewQuestion.value === 0) {
            event.preventDefault();
            this.refs.inputNewQuestion.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaQuestions = false;
        }
        else {
            this.refs.inputNewQuestion.style.boxShadow = "none";
        }
        if (this.refs.inputNewQuestion.value > 300){
            this.refs.inputNewQuestion.style.boxShadow = "0px 0px 2px 2px #ff0000";
            alert("Вы превысили максимальное количество символов");
            proverkaQuestions = false;
        }

        if (proverkaQuestions === true) {
            console.log("-------------stage addQuestion complete_______");

        }





            // ------------------
            // let a = "DIMAAAAAAAAAA";
            // let a = this.props.refs.inputNewQuestion.value;
            // store.dispatch(addQuestion("hello"));
            // this.props.history.push(`/play/game/${this.props.match.params.id}`);
        };


    render() {
        return (
            <div className="newQuestionForm"><h2>Add new question</h2>
                <textarea
                    ref="inputNewQuestion"
                    placeholder='Please write your questions'
                    type="text"
                />
                <button onClick={this.saveQuestion}>AddQuestion</button>

            </div>
        )

    }
}