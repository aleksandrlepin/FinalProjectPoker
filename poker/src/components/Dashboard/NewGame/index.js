import React from 'react';
import Menu from '../Menu/index.js';

export default class NewGame extends React.Component {
    constructor() {
        super();
        this.state= {
            questions: {},
            rows : [],
            owner: 'Dima',
            answers:{},
            users:[],
            numbQuestions : 1
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleSubmit = (event) => {
        // event.preventDefault();
        let objectNewGame = {
            nameGame: this.refs.nameGame.value,
            owner:this.state.owner,
            description:this.refs.description.value,
            questions:this.state.questions,
            answers:this.state.answers,
            users:this.state.users
        };
        let newGame = JSON.stringify(objectNewGame);
        console.log("------------------------ StartFETCH");

        fetch('/saveGame', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newGame
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
        console.log("------------------------  fetch RUUUUN");
    };
    addedQuestion=(event)=>{
        event.preventDefault();
        let arr=this.state.questions;
        // console.log(' ========================= '+arr);
        let a = this.state.numbQuestions;
        // this.state.questions.key = a ;
        // this.state.answers.key = a ;
        this.state.questions[a] = this.refs.question.value;
        this.state.answers[a] = "";
        this.state.rows.push(this.refs.question.value);
        this.state.numbQuestions++;
        this.refs.question.value="";
        this.setState({questions : arr})
    };

    render() {
        return (
            <div className='row'>
                <div className='container'>
                    <div className="col-lg-3 col-sm-12">
                        <Menu />
                    </div>
                    <div className="col-lg-5">
                        <form>
                            <h1>
                                Create New Game
                            </h1>
                            <label htmlFor="nameGame">
                                <h3>Game Name</h3>
                                <input
                                    ref="nameGame"
                                    id="nameGame"
                                    type="text"
                                    placeholder="name game"

                                />
                            </label>
                            <h3>Description</h3>
                            <div>
                                    <textarea
                                        ref="description"
                                        type="text"
                                        placeholder='input description'
                                        >
                                    </textarea>
                            </div>
                            <label htmlFor="question">
                                <h3>Add questions</h3>
                                <input
                                    ref="question"
                                    id="question"
                                    type="text"
                                    placeholder="input question"
                                />
                                <button className="btn-default"
                                        onClick={this.addedQuestion}>
                                    Add question
                                </button>
                            </label>
                            <div
                                className="listQuestions">
                            </div>
                            <div>
                                {
                                    this.state.rows.length>0 ?
                                        this.state.rows.map((item, index)=>{
                                            return(
                                                <p key={index}>{index+1}. {item}</p>)
                                        })
                                        :
                                        <div className="questionOnNewGame">No questions</div>
                                }
                                <button
                                    onClick={this.handleSubmit}
                                    className="btn-default"
                                    type="submit">
                                    Create Game
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}