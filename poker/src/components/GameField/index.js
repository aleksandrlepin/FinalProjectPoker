import React from 'react';
import openSocket from 'socket.io-client';
import { socket } from '../../constants/consts';

import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCard from '../usersCards/UserCard';
import Question from './Question';
import { DBtoStore, updateStore } from '../../actions';
import store from './store/index';
import './gameField.css';
import ModalNewPlayer from './ModalNewPlayer';


const URL = "http://localhost:3000";

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...store.getState(), activeIndex: null, activeQuestionIndex: '1' };
        let gameId = this.props.match.params.id;

        fetch(`${URL}/games/${gameId}`, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                store.dispatch(DBtoStore(res));
            })
            .catch(err => console.log(err));

        store.subscribe(() => {
            this.setState({ dbToStore: store.getState().dbToStore });
            console.log('i am from subcribe>>>>>>>>>>>>>>>>>>> this.state.dbToStore[0].users.length', this.state.dbToStore[0].users.length)
        });

        function log(message) {
            var el = document.getElementById('socket-msg');
            el.innerHTML = message;
        }

        socket.on('updateDb', function (data) {
            fetch(`${URL}/games/${gameId}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => {
                    store.dispatch(updateStore(res));
                })
                .catch(err => console.log(err));
        });

        socket.on('login', function (data) {
            var message = "Player:  " + data;
            log(message);
        });

        socket.on('renderQuestion', (index) => this.setState({ activeQuestionIndex: index.index}))
    }

    componentWillUnmount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    changeActiveCard = (indexVouted) => this.setState({ activeIndex: indexVouted });

    checkActiveCard = (value) => (this.state.activeIndex === +value ? "voutingCard vouted-card" : "voutingCard");

    changeActiveQuestion = (activeQuestionIndex) => this.setState({ activeQuestionIndex: activeQuestionIndex });
    
    checkActiveQuestion = (value) => (this.state.activeQuestionIndex === value ? "wrapper-for-question active-question" : "wrapper-for-question");

    render() {
        return (
            <div className="game-field">
                <ModalNewPlayer gameId={this.props.match.params.id} />
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
                                <div className="container-for-user-cards">
                                    <div id='socket-msg'></div>
                                    {this.state.dbToStore[0].users.map((user, index) => {
                                        return <UserCard user={user} key={index} />
                                    })}
                                </div>
                                <button className="show-cards">Flip cards</button>
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

export default GameField;