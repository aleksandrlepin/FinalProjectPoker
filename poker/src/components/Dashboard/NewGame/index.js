import React from 'react';
import Menu from '../Menu/index.js';
import "./newGame.css";

export default class NewGame extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: {},
            rows: [],
            owner: {
                name: JSON.parse(localStorage.getItem('username')),
                email: JSON.parse(localStorage.getItem('useremail'))
            },
            answers: {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0,
                "7": 0,
                "8": 0,
                "9": 0,
                "10": 0,
                "11": 0,
                "12": 0,
                "13": 0,
                "14": 0,
                "15": 0,
                "16": 0,
                "17": 0,
                "18": 0,
                "19": 0,
                "20": 0,
                "21": 0,
                "22": 0,
                "23": 0,
                "24": 0,
                "25": 0,
            },
            users: [{ name: JSON.parse(localStorage.getItem('username')), email: JSON.parse(localStorage.getItem('useremail')), answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
            numbQuestions: 1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {

        event.preventDefault();

        // -----------proverka NameGame--------------
        let proverkaNameGame = true;
        if (this.refs.nameGame.value.length > 100) {
            event.preventDefault();
            this.refs.nameGame.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaNameGame = false;
            // alert("Название игры не должно состоять из более  чем 100 символов");
        }
        if (this.refs.nameGame.value.length === 0) {
            event.preventDefault();
            this.refs.nameGame.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaNameGame = false;
            // alert("Название игры не должно быть пустым");
        }
        if (proverkaNameGame === true) {
            this.refs.nameGame.style.boxShadow = "none";
            console.log("name game TRUE");
        }

        // -----------proverka description--------------
        let proverkaDescription = true;
        if (this.refs.description.value.length === 0) {
            event.preventDefault();
            this.refs.description.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaDescription = false;
            // alert("Описание игры не должно быть пустым");
        }
        else if (this.refs.description.value.length > 100) {
            event.preventDefault();
            this.refs.description.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaDescription = false;
            // alert("Описание игры не должно состоять из более  чем 100 символов");
        }
        if (proverkaDescription === true) {
            this.refs.description.style.boxShadow = "none";
            console.log("-----------------------------------------------------Description TRUE");
        }

        // -----------proverkaQuestions--------------
        let proverkaQuestions = true;
        if (this.state.rows.length === 0) {
            event.preventDefault();
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";
            proverkaQuestions = false;
        }
        else {
            this.refs.question.style.boxShadow = "none";
        }

        if (proverkaNameGame === true && proverkaDescription && true && proverkaQuestions === true) {
            let objectNewGame = {
                nameGame: this.refs.nameGame.value,
                owner: this.state.owner,
                description: this.refs.description.value,
                questions: this.state.questions,
                answers: this.state.answers,
                users: this.state.users
            };
            console.log(objectNewGame);
            let newGame = JSON.stringify(objectNewGame);
            console.log(newGame);
            console.log("------------------------ StartFETCH");

            fetch('/saveGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: newGame
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err));
            console.log("------------------------  fetch RUUUUN");

            // --------
            this.props.history.push("/dashboard");
            // ---------
        }
        else {
            alert("Заполните все поля");
        }
    };

    addedQuestion = (event) => {
        event.preventDefault();
        console.log("this.refs.question.value.length :" + this.refs.question.value.length);
        if (this.refs.question.value.length === 0) {
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";
            alert("Перед добавлением вопроса вы должны его написать!!!");
        }
        else if (this.refs.question.value.length > 300) {
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";
            alert("Вопрос должен содержать не более 300 символов");
        }
        else {
            this.refs.question.style.boxShadow = "none";
            let a = this.state.numbQuestions;
            this.setState({ questions: Object.assign(this.state.questions, { [a]: this.refs.question.value }) });
            this.setState({ answers: Object.assign(this.state.answers, { [a]: "" }) });
            this.state.rows.push(this.refs.question.value);
            this.refs.question.value = "";
            this.setState({ numbQuestions: a + 1 });
        }
    };
    render() {
        return (
            <div className='row'>
                <div className='container'>
                    <div className="col-lg-3 col-sm-12">
                        <Menu />
                    </div>
                    <div className="col-lg-5">
                        <form className="formNewGame">
                            <h1 id="formNewGameHeading">
                                Create New Game
                            </h1>
                            <label htmlFor="nameGame">
                                <h3 id="nameGameHeading">Game Name</h3>
                                <input
                                    ref="nameGame"
                                    id="nameGameValue"
                                    type="text"
                                    placeholder="Game name"
                                />
                            </label>
                            <h3 id="descriptionHeading">Description</h3>
                            <div>
                                <textarea id="descriptionValue"
                                    ref="description"
                                    type="text"
                                    placeholder='  Description'
                                >
                                </textarea>
                            </div>
                            <label htmlFor="question" id="labelQuestions">
                                <h3 id="questionsHeading">Add questions</h3>
                                <textarea
                                    ref="question"
                                    id="questionsValue"
                                    type="text"
                                    placeholder="  Question"
                                />
                                <button
                                    // className="btn-default"
                                    id="addQuestionsButton"
                                    type="submit"
                                    onClick={this.addedQuestion}>
                                </button>
                            </label>
                            <div
                                className="listQuestions">
                            </div>
                            <div id="questionsField" placeholder="List of questions">
                                {
                                    this.state.rows.length > 0 ?
                                        this.state.rows.map((item, index) => {
                                            return (
                                                <p key={index}>{index + 1}. {item}</p>)
                                        })
                                        :
                                        <div className="questionOnNewGame"><span><pre style={{ fontSize: 22 + "px" }}> No questions</pre></span></div>
                                }
                            </div>
                            <button id="createGameCancelButton"
                                type="submit"
                            >
                                Cancel
                            </button>
                            <button id="createGameButton"
                                onClick={this.handleSubmit}
                                type="submit"
                            >
                                Create Game
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}