import React from 'react';
import Menu from '../Menu/index.js';
// import "./newGame.css";

const initialState = {
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
        // ---------------------------------------------

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

    handleCancel = (e) => {
        this.setState(initialState);
    };

    addedQuestion = (event) => {
        console.log('event: ', event.type);
        console.log('event: ', event.key);
        if (event.type === 'keypress' && event.key !== "Enter") {
            // event.preventDefault();
            return;
        }
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

    handleClickCreate = (e) => {
        e.preventDefault();
		this.props.history.push("/newgame")
	};

	handleSavedGames = () => {
		this.props.history.push("/dashboard")
	};

    render() {
        return (
            <main className="create-game">
                <form action="" className="form">
                    <button className="form__button-create button-create" onClick={this.handleClickCreate} >
                        <svg className="button-create__svg-plus" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve" width="512px" height="512px">
                            <circle className="button-create__svg-plus_active-path" cx="256" cy="256" r="256" data-original="#25B6D2" data-old_color="#F9F8F8" />
                            <rect className="button-create__svg-plus_secondary-path" x="240" y="120" width="40" height="280" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                            <rect className="button-create__svg-plus_secondary-path" x="120" y="240" width="280" height="40" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                        </svg>
                        Create new game
                    </button>

                    <div className="form__create">
                        <h1 className="form__title" id="formNewGameHeading">Create New Game</h1>
                        <label htmlFor="nameGameValue" className="form__label" id="nameGameHeading">Game name</label>
                        <input className="form__input" type="text" ref="nameGame" id="nameGameValue" placeholder="Game name" />
                        <label htmlFor="descriptionValue" className="form__label">Description</label>
                        <input className="form__input" id="descriptionValue" ref="description" type="text" placeholder="Description" />
                        <label htmlFor="questionsValue" className="form__label">Add question</label>
                        <input className="form__input" ref="question" onKeyPress={this.addedQuestion} id="questionsValue" type="text" placeholder="Question" />
                        <button className="form__button-add button-add" onClick={this.addedQuestion} id="addQuestionsButton">
                            <svg className="button-add__svg-plus" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve" width="512px" height="512px">
                                <circle className="button-add__svg-plus_active-path" cx="256" cy="256" r="256" data-original="#25B6D2" data-old_color="#F9F8F8" />
                                <rect className="button-add__svg-plus_secondary-path" x="240" y="120" width="40" height="280" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                                <rect className="button-add__svg-plus_secondary-path" x="120" y="240" width="280" height="40" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                            </svg>
                        </button>
                        <div className="form__input form__input-question-list">
                            {this.state.rows.length > 0
                                ? this.state.rows.map((item, index) => {
                                    return (
                                        <p className="form__input-question" key={index}>{index + 1}. {item}</p>
                                    )
                                })
                                : <p className="form__input-question">
                                    No question
                                </p>
                            }
                        </div>
                    </div>

                    <section className="form__button-block">
                        <button className="form__button-cancel" type='reset' onClick={this.handleCancel}>Cancel</button>
                        <button className="form__button-game" onClick={this.handleSubmit}>Create game</button>
                    </section>

                    <button className="form__button-saved button-saved" onClick={this.handleSavedGames} >
                        <svg className="button-saved__svg-list" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 496.158 496.158" style={{ enableBackground: "new 0 0 496.158 496.158" }} xmlSpace="preserve" width="512px" height="512px"><g />
                            <path className="button-saved__svg-list_active-path" d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085  c0,137.002,111.07,248.07,248.083,248.07C385.088,496.155,496.158,385.087,496.158,248.085z" data-original="#E04F5F" data-old_color="#ff6c00" /><g />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,226.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,230.558,398.102,226.079,392.579,226.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,226.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,230.558,133.102,226.079,127.579,226.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,157.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,161.558,398.102,157.079,392.579,157.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,157.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,161.558,133.102,157.079,127.579,157.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,295.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,299.558,398.102,295.079,392.579,295.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,295.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,299.558,133.102,295.079,127.579,295.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                        </svg>
                        Saved games
                    </button>
                </form>
            </main>

            // <div className='row'>
            //     <div className='wrapper-new-game'>
            //         <div className="col-lg-3 col-sm-12">
            //             <Menu />
            //         </div>
            //         <div className="col-lg-5">
            //             <form className="formNewGame">
            //                 <h1 id="formNewGameHeading">
            //                     Create New Game
            //                 </h1>
            //                 <label htmlFor="nameGame">
            //                     <h3 id="nameGameHeading">Game Name</h3>
            //                     <input
            //                         ref="nameGame"
            //                         id="nameGameValue"
            //                         type="text"
            //                         placeholder="Game name"
            //                     />
            //                 </label>
            //                 <h3 id="descriptionHeading">Description</h3>
            //                 <div>
            //                     <textarea id="descriptionValue"
            //                         ref="description"
            //                         type="text"
            //                         placeholder='  Description'
            //                     >
            //                     </textarea>
            //                 </div>
            //                 <label htmlFor="question" id="labelQuestions">
            //                     <h3 id="questionsHeading">Add questions</h3>
            //                     <textarea
            //                         ref="question"
            //                         id="questionsValue"
            //                         type="text"
            //                         placeholder="  Question"
            //                     />
            //                     <button
            //                         // className="btn-default"
            //                         id="addQuestionsButton"
            //                         type="submit"
            //                         onClick={this.addedQuestion}>
            //                     </button>
            //                 </label>
            //                 <div
            //                     className="listQuestions">
            //                 </div>
            //                 <div id="questionsField" placeholder="List of questions">
            //                     {
            //                         this.state.rows.length > 0 ?
            //                             this.state.rows.map((item, index) => {
            //                                 return (
            //                                     <p key={index}>{index + 1}. {item}</p>)
            //                             })
            //                             :
            //                             <div className="questionOnNewGame"><span><pre style={{ fontSize: 22 + "px" }}> No questions</pre></span></div>
            //                     }
            //                 </div>
            //                 <button id="createGameCancelButton"
            //                     type="submit"
            //                 >
            //                     Cancel
            //                 </button>
            //                 <button id="createGameButton"
            //                     onClick={this.handleSubmit}
            //                     type="submit"
            //                 >
            //                     Create Game
            //                 </button>

            //             </form>
            //         </div>
            //     </div>
            // </div>
        )
    }
}
