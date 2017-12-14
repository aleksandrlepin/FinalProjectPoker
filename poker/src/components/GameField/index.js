import React from 'react';
import openSocket from 'socket.io-client';
import { socket } from '../../constants/consts';
import { withRouter } from 'react-router-dom';
import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCard from '../usersCards/UserCard';
import Question from './Question';
import { DBtoStore, updateStore, userAuthorization, changeAverage } from '../../actions';
import store from './store/index';
import './gameField.css';
import ModalNewPlayer from './ModalNewPlayer';


const URL = "http://localhost:3000";

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...store.getState(), activeIndex: null, activeQuestionIndex: '1', users_answer: {} };
        let gameId = this.props.match.params.id;

        this.callSocket();
        let token = JSON.stringify({ token: JSON.parse(localStorage.getItem('token')) });
        console.log(token);
        fetch(`${URL}/games/${gameId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: token
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === false) {
                    this.props.history.push('/login');
                } else {
                    console.log('from gamefield')

                    store.dispatch(DBtoStore(res));
                }


            })
            .catch(err => console.log(err));

        store.subscribe(() => {
            this.setState({ dbToStore: store.getState().dbToStore });
            console.log('i am from subcribe>>>>>>>>>>>>>>>>>>> this.state.dbToStore[0].users.length', this.state.dbToStore[0].users.length)
        });

        // function log(message) {
        //     var el = document.getElementById('socket-msg');
        //     el.innerHTML = message;
        // }

        socket.on('updateDb', function (data) {
            fetch(`/games/${gameId}`, { method: 'POST' })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    store.dispatch(updateStore(res));
                })
                .catch(err => console.log(err));
        });

        socket.on('login', function (data) {
            var message = "Player:  " + data;
            console.log(message);
            // log(message);
        });

        socket.on('renderQuestion', (index) => this.setState({ activeQuestionIndex: index.index }))

        socket.on('changeAverageInDb', function (y) {
            console.log('from on changeAverageInDb')
            store.dispatch(changeAverage(y));
        })
    }

    callSocket = () => {
        console.log('callSocket')
        socket.emit('add owner', JSON.parse(localStorage.getItem('username')));
    };

    componentWillUnmount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    changeActiveCard = (indexVouted) => this.setState({ activeIndex: indexVouted });

    checkActiveCard = (value) => (this.state.activeIndex === +value ? "voutingCard vouted-card" : "voutingCard");

    changeActiveQuestion = (activeQuestionIndex) => this.setState({ activeQuestionIndex: activeQuestionIndex });

    checkActiveQuestion = (value) => (this.state.activeQuestionIndex === value ? "wrapper-for-question active-question" : "wrapper-for-question");

    addToAnswers = (userId, answer) => {
        // if(this.state.answers[userId])
        console.log(this.state.users_answer[userId])
        if (this.state.users_answer[userId]) {
            this.state.users_answer[userId] = answer
        }
        else { this.setState({ users_answer: { ...this.state.users_answer, [userId]: answer } }) }
    }

    calcAverage = () => {
        let answers = this.state.users_answer
        let aver = 0
        Object.keys(answers).map((item, index) => aver += answers[item])

        // var aver_el = document.getElementById('average_result');
        // aver_el.innerHTML = aver;
        console.log(" this.state.dbToStore[0].answers ", this.state.activeQuestionIndex);
        let y = { index: this.state.activeQuestionIndex, average_value: aver }


        socket.emit('renderAverage', y);

        return aver
    }

    render() {
        return (
            // <RenderIf condition={true}>

            // </RenderIf>
            <div className="game-field">
                {localStorage.getItem('isOwner') ?
                    null :
                    <ModalNewPlayer gameId={this.props.match.params.id} />}

                {this.state.dbToStore[0] === undefined ?
                    null :
                    <div className='row'>
                        <div className='container-for-questions col-sm-12 col-md-3'>
                            {Object.keys(this.state.dbToStore[0].questions).map(key => <Question
                                key={key}
                                index={key}
                                question={this.state.dbToStore[0].questions[key]}
                                className={this.checkActiveQuestion(key)}
                                currentQuestion={this.changeActiveQuestion}
                                answer={this.state.dbToStore[0].answers[key]}
                            />)}
                            <div className="addQuestion">+</div>
                        </div>

                        <div className='container-for-main-right-part col-sm-12 col-md-9'>
                            <div className="single-question">
                                <span className='question-title'>Question: </span>
                                {this.state.dbToStore[0].questions[this.state.activeQuestionIndex]}
                                <div></div>
                                <span className='question-title'>Number of players: </span>
                                {this.state.dbToStore[0].users.length}
                            </div>
                            <div className="average-result" id='average_result'>No result</div>
                            <div className="container-for-user-cards">
                                <div id='socket-msg'></div>
                                {this.state.dbToStore[0].users.map((user, index) => {
                                    return <UserCard user={user} key={index} addToAnswers={this.addToAnswers} />
                                })}
                            </div>
                            <button className="show-cards" onClick={this.calcAverage}>Flip cards</button>
                        </div>
                    </div>}
                <div className='row'>
                    <div className='container-for-vouting-cards col-sm-12 col-md-12'>
                        {fibNumbers.map((value, index) => <VoutingCard number={value} key={index}
                            className={this.checkActiveCard(value, index)}
                            onClick={this.changeActiveCard} />)}
                    </div>
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-2">
                        <button>End Game</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GameField)