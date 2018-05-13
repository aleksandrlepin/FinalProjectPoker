import React from 'react';
import { socket } from '../../constants/consts';
import { withRouter } from 'react-router-dom';
import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCard from '../usersCards/UserCard';
import Question from './Question';
import ModalFinishGame from './finishGame/ModalFinishGame';
import { DBtoStore, updateStore, changeAverage, resetCards, saveAnswer } from '../../actions';
import store from './store/index';
import ModalNewPlayer from './ModalNewPlayer';
import ModalAddQuestion from './addQuestion/ModalAddQuestion.js';
import { addQuestion } from "./store/actions";
import GameControls from './GameControls';
import { addPlayer } from '../../actions';


class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...store.getState(),
            activeIndex: null,
            activeQuestionIndex: 1,
            users_answer: {},
            playerName: '',
            isOwner: true,
        };

        let gameId = this.props.match.params.id;
        localStorage.setItem('gameId', JSON.stringify(gameId));
        this.callSocket();
        let token = JSON.stringify({ token: JSON.parse(localStorage.getItem('token')) });
        fetch(`/games/${gameId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: token
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === false) {
                    this.props.history.push('/login');
                } else {
                    store.dispatch(DBtoStore(res));
                }
            })
            .catch(err => console.log(err));

        store.subscribe(() => {
            this.setState({ dbToStore: store.getState().dbToStore });
        });

        socket.on('updateDb', function (data) {
            fetch(`/games/${gameId}`, { method: 'POST' })
                .then(res => res.json())
                .then(res => {
                    store.dispatch(updateStore(res));
                })
                .catch(err => console.log(err));
        });

        // socket.on('login', function (name) {
        //     localStorage.setItem('playername', JSON.stringify(name));
        //     // this.setState({playerName: name})
        //     console.log('player', name);
        // });

        socket.on('renderQuestion', (index) => {
            this.setState({ activeQuestionIndex: index.index });
        })

        socket.on('changeAverageInDb', function (y) {
            store.dispatch(changeAverage(y));
        })

    }


    callSocket = () => {

        socket.emit('add owner', {
            name: JSON.parse(localStorage.getItem('username')),
            email: JSON.parse(localStorage.getItem('useremail'))
        });
    };

    componentWillUnmount() {
        // this.state.isOwner && this.clearPlayers();
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentDidMount() {
        // if (JSON.parse(localStorage.getItem('isOwner'))) this.setState({ isOwner: true });
        this.handlePlay();
    }

    changeActiveCard = (indexVouted) => this.setState({ activeIndex: indexVouted });

    checkActiveCard = (value) => (this.state.activeIndex === +value ? "voutingCard vouted-card" : "voutingCard");

    changeActiveQuestion = (activeQuestionIndex) => this.setState({ activeQuestionIndex: activeQuestionIndex });

    checkActiveQuestion = (value) => (this.state.activeQuestionIndex === +value ? "wrapper-for-question active-question" : "wrapper-for-question");

    addToAnswers = (userId, answer) => {
        if (this.state.users_answer[userId]) {
            this.setState(prevState => ({
                users_answer: {
                    ...prevState.users_answer,
                    [userId]: answer,
                },

            }))
        }
        else { this.setState({ users_answer: { ...this.state.users_answer, [userId]: answer } }) }
        store.dispatch(saveAnswer({
            user_name: userId,
            question_number: this.state.activeQuestionIndex,
            question_value: answer
        }))
    }

    calcAverage = () => {
        console.log('calcAverage: ');
        let answers = this.state.users_answer;
        var aver = 0;
        let players_number = 0;


        Object.keys(answers).map((item, index) => aver += answers[item])
        for (let i in this.state.users_answer) { players_number++ }


        aver = aver / players_number;

        for (var i = 0; i < fibNumbers.length; i++) {
            if (aver > fibNumbers[i] && aver < fibNumbers[i + 1]) { aver = fibNumbers[i + 1] }
        }


        let y = { index: this.state.activeQuestionIndex, average_value: aver };


        socket.emit('renderAverage', y);
        // store.dispatch(changeAverage(y));
        console.log('aver: ', aver);
        return aver
    }
    createNewQuestion = () => {
        this.setState({ addQuestion: true });
    }

    modalClose = () => {
        this.setState({ endGame: false });
        this.setState({ addQuestion: false });
    }

    addQuestionToGame = (data) => {
        store.dispatch(addQuestion(data));


        // console.log( data);
    }

    resetCards = () => {
        console.log('resetCards: ');
        store.dispatch(resetCards(this.state.activeQuestionIndex));
        socket.emit('resetCards');
        socket.emit('renderAverage', { index: this.state.activeQuestionIndex, average_value: 0 });
    }

    // finish game and save to db
    endGame = (e) => {
        e.preventDefault();
        let data = JSON.stringify(this.state.dbToStore[0])

        fetch(`/endgame`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then(res => res.json())
            .then(res => {
            })
            .catch(err => console.log(err));
        this.setState({ endGame: true })
    }

    prevQuestion = () => {
        console.log('prevQuestion: ');
        let questions = []
        for (let key in this.state.dbToStore[0].questions) {
            questions.push(this.state.dbToStore[0].questions[key])
        }
        let index = +this.state.activeQuestionIndex;
        if (+this.state.activeQuestionIndex > 1) {
            this.setState({ activeQuestionIndex: +this.state.activeQuestionIndex - 1 });
            index -= 1;
        } else {
            this.setState({ activeQuestionIndex: questions.length });
            index = questions.length
        }
        socket.emit('transferQuestion', index);
    }

    nextQuestion = () => {
        console.log('nextQuestion: ');
        let questions = [];
        for (let key in this.state.dbToStore[0].questions) {
            questions.push(this.state.dbToStore[0].questions[key])
        }
        let index = +this.state.activeQuestionIndex;
        if (+this.state.activeQuestionIndex < questions.length) {
            this.setState({ activeQuestionIndex: +this.state.activeQuestionIndex + 1 })
            index += 1
        } else {
            this.setState({ activeQuestionIndex: 1 })
            index = 1
        }
        socket.emit('transferQuestion', index);
    }

    handlePlay = () => {
        // this.setState({ modalIsOpen: false });
        let data = JSON.stringify({
            gameId: this.props.match.params.id,
            user: {
                name: JSON.parse(localStorage.getItem('username')),
                email: JSON.parse(localStorage.getItem('useremail')),
                //create array with empty answers to make it possible change answers through map in action SAVE_ANSWER
                //!!!will work for games less than 25 questions
                answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        });

        // Tell the server your username
        let player = {
            name: JSON.parse(localStorage.getItem('username')),
            email: JSON.parse(localStorage.getItem('useremail')),
        }
        console.log('player: ', player);

        fetch(`/addPlayer`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                console.log('res!!!!!', res)
                socket.emit('add user', player);
                if (res.owner) {
                    this.setState({ isOwner: true });
                    // this.props.history.push('/loginOwnGame');
                    // localStorage.setItem('currentGameId', this.props.match.params.id);
                    // localStorage.setItem('isOwner', true);
                    // localStorage.setItem('username', JSON.stringify(res.username));
                } else {
                    this.setState({ isOwner: false });
                    store.dispatch(addPlayer(res.game));
                }

            })
            .catch(err => console.log(err));
    }

    render() {
        console.log('qwestions', this.state.dbToStore[0]);
        return (

            <main className="game">
                {this.state.endGame && <ModalFinishGame game={this.state.dbToStore[0]} modal={this.modalClose} />}
                {this.state.addQuestion && <ModalAddQuestion addNewQuestion={this.addQuestionToGame} modal={this.modalClose} />}
                {this.state.isOwner || localStorage.getItem('username') ?
                    null :
                    <ModalNewPlayer gameId={this.props.match.params.id} />}
                {this.state.dbToStore[0] !== undefined ?
                    <section className="cards">
                        <h1 className="cards__header">{this.state.dbToStore[0].questions[this.state.activeQuestionIndex]}</h1>
                        <div className="cards__block">
                            {this.state.dbToStore[0].users.map((user, index) => {
                                return <UserCard
                                    user={user}
                                    key={index}
                                    addToAnswers={this.addToAnswers}
                                    answers={this.state.dbToStore[0].answers}
                                    currentQuestion={this.state.activeQuestionIndex} />
                            })}
                        </div>
                    </section>
                    : null
                }
                <section className="buttons">
                    {this.state.isOwner &&
                        <GameControls
                            calcAverage={this.calcAverage}
                            resetCards={this.resetCards}
                            prevQuestion={this.prevQuestion}
                            nextQuestion={this.nextQuestion}
                        />
                    }
                    <div className="buttons__cards">
                        {fibNumbers.map((value, index) => <VoutingCard number={value} key={index}
                            className={this.checkActiveCard(value, index)}
                            onClick={this.changeActiveCard} />)}
                    </div>
                </section>
                <section className="questions">
                    <div className="questions__block">
                        {this.state.dbToStore[0] && Object.keys(this.state.dbToStore[0].questions).map(key => <Question
                            key={key}
                            index={key}
                            question={this.state.dbToStore[0].questions[key]}
                            className={this.checkActiveQuestion(key)}
                            currentQuestion={this.changeActiveQuestion}
                            answer={this.state.dbToStore[0].answers[key] ? this.state.dbToStore[0].answers[key] : '-'}
                        />)}
                    </div>
                    {this.state.isOwner &&
                        <span className="questions__add-item" onClick={this.createNewQuestion}>+</span>
                    }
                </section>
                {this.state.isOwner &&
                    <div className="game__button-block">
                        <a>
                            <button className="game__button-end" onClick={this.endGame}>End game</button>
                        </a>
                    </div>
                }
            </main>
        )
    }
}

export default withRouter(GameField)
