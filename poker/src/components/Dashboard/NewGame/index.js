import React from 'react';
import Menu from '../Menu/index.js';
import "./newGame.css";

export default class NewGame extends React.Component {
    constructor() {
        super();
        this.state={
            questions: {},
            rows : [],
            owner: 'Dima',
            answers: {},
            users: [],
            numbQuestions : 1
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
         // event.preventDefault();
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
            this.refs.question.style.boxShadow = "none";
            console.log("name game TRUE");
        }
        // -----------End proverka NameGame--------------

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
        else if (proverkaDescription === true) {
            this.refs.question.style.boxShadow = "none";
            console.log("Description TRUE");
        }
        // -----------End proverka questions--------------

        // -----------proverkaQuestions--------------
        let proverkaQuestions = true;
        if (this.state.rows.length === 0) {
            event.preventDefault();
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";
            console.log("Description TRUE");
            // alert("Вы не добавили не одного вопроса");
            proverkaQuestions = false;
        }
        else {
            this.refs.question.style.boxShadow = "none";
        }
        // -----------end proverkaQuestions--------------

        if (proverkaNameGame === true || proverkaDescription === true || proverkaQuestions === true) {
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
                headers: {'Content-Type': 'application/json'},
                body: newGame
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err));
            console.log("------------------------  fetch RUUUUN");

            // --------
            // this.props.history.push("/")
                // ---------
        }
    else{
         alert("Заполните все поля");
        }
}

    addedQuestion=(event)=>{
        event.preventDefault();
        console.log("this.refs.question.value.length :"+this.refs.question.value.length);
        if(this.refs.question.value.length===0){
            this.refs.question.style.boxShadow="0px 0px 2px 2px #ff0000";
            alert("Перед добавлением вопроса вы должны его написать!!!");
        }
        else if(this.refs.question.value.length>300)
        {
            this.refs.question.style.boxShadow="0px 0px 2px 2px #ff0000";
            alert("Вопрос должен содержать не более 300 символов");
        }
        else{
           this.refs.question.style.boxShadow="none";
           let a = this.state.numbQuestions;
            // this.state.questions[a] = this.refs.question.value;
           this.setState({answers: Object.assign(this.state.answers, {[a]: ""})});
           this.state.rows.push(this.refs.question.value);
           this.refs.question.value = "";
           this.setState({numbQuestions: a + 1});
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
                                <h3 id = "nameGameHeading">Game Name</h3>
                                <input
                                    ref="nameGame"
                                    id="nameGameValue"
                                    type="text"
                                    placeholder=" Input name game"
                                />
                            </label>
                            <h3 id ="descriptionHeading">Description</h3>
                            <div>
                                    <textarea id ="descriptionValue"
                                        ref="description"
                                        type="text"
                                        placeholder='  input description'
                                        >
                                    </textarea>
                            </div>
                            <label htmlFor="question" id = "labelQuestions">
                                <h3 id = "questionsHeading">Add questions</h3>
                                <textarea
                                    ref="question"
                                    id="questionsValue"
                                    type="text"
                                    placeholder="  input question"
                                />
                                <button
                                        // className="btn-default"
                                        id ="addQuestionsButton"
                                        type = "submit"
                                        onClick={this.addedQuestion}>
                                </button>
                            </label>
                            <div
                                className="listQuestions">
                            </div>
                            <div id = "questionsField" placeholder="List questions">
                                {
                                    this.state.rows.length>0 ?
                                        this.state.rows.map((item, index)=>{
                                            return(
                                                <p key={index}>{index+1}. {item}</p>)
                                        })
                                        :
                                        <div className="questionOnNewGame"><span><pre> No questions</pre></span></div>
                                }
                            </div>
                            <button id ="createGameCancelButton"
                                    // onClick={function(){this.props.history.push("/")}}
                                //     className="btn-default"
                                    type="submit">
                                Cancel
                            </button>
                            <button id ="createGameButton"
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