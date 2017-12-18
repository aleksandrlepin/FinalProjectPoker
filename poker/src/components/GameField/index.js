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
import './gameField.css';
import ModalNewPlayer from './ModalNewPlayer';


// const URL = "http://localhost:3000";

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOwner : false }
        this.state = { ...store.getState(), activeIndex: null, activeQuestionIndex: '1', users_answer: {} };
        let gameId = this.props.match.params.id;
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
            console.log('store subscribe')
            this.setState({ dbToStore: store.getState().dbToStore });
        });

        socket.on('updateDb', function (data) {
            fetch(`/games/${gameId}`, { method: 'POST' })
                .then(res => res.json())
                .then(res => {
                    console.log('from fetch socket updatedb')
                    store.dispatch(updateStore(res));
                })
                .catch(err => console.log(err));
        });

        socket.on('login', function (data) {
            var message = "Player:  " + data;
            console.log(message);
        });

        socket.on('renderQuestion', (index) => this.setState({ activeQuestionIndex: index.index }))

        socket.on('changeAverageInDb', function (y) {
            store.dispatch(changeAverage(y));
        })

    }

    callSocket = () => {
        socket.emit('add owner', JSON.parse(localStorage.getItem('username')));
    };

    componentWillUnmount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('isOwner'))) this.setState({isOwner : true})
    }

    changeActiveCard = (indexVouted) => this.setState({ activeIndex: indexVouted });

    checkActiveCard = (value) => (this.state.activeIndex === +value ? "voutingCard vouted-card" : "voutingCard");

    changeActiveQuestion = (activeQuestionIndex) => this.setState({ activeQuestionIndex: activeQuestionIndex });

    checkActiveQuestion = (value) => (this.state.activeQuestionIndex === value ? "wrapper-for-question active-question" : "wrapper-for-question");

    addToAnswers = (userId, answer) => {
        if (this.state.users_answer[userId]) {
            this.state.users_answer[userId] = answer
        }
        else { this.setState({ users_answer: { ...this.state.users_answer, [userId]: answer } }) }
        store.dispatch(saveAnswer({
            user_name: userId,
            question_number: this.state.activeQuestionIndex,
            question_value: answer}))
    }

    calcAverage = () => {
        let answers = this.state.users_answer
        var aver = 0
        let players_number =0

        Object.keys(answers).map((item,index)=> aver += answers[item])    
        for(i in this.state.users_answer){players_number++}
        
        aver = aver/players_number

        for(var i=0;i<fibNumbers.length;i++){
            if(aver>fibNumbers[i] && aver<fibNumbers[i+1]){aver=fibNumbers[i+1]}
        }


        let y = { index: this.state.activeQuestionIndex, average_value: aver };


        socket.emit('renderAverage', y);
        // store.dispatch(changeAverage(y));
        return aver
    }
    createNewQuestion = () => {
        this.props.history.push(`/game/${this.props.match.params.id}/newQuestion`);
    }

    modalClose = () => {
        this.setState({endGame : false})
    }

    resetCards = () => {
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
            this.setState({endGame : true})
    }

    prevQuestion = () => {
        let questions = []
        for (let key in this.state.dbToStore[0].questions) {
            questions.push(this.state.dbToStore[0].questions[key])
        }
        let index = parseInt(this.state.activeQuestionIndex) - 1;
        if (parseInt(this.state.activeQuestionIndex) > 1) {
            this.setState({activeQuestionIndex: ''+index+''})
        } else { 
            this.setState({activeQuestionIndex: ''+questions.length+''})
        }  
    }

    nextQuestion = () => {
        let questions = []
        for (let key in this.state.dbToStore[0].questions) {
            questions.push(this.state.dbToStore[0].questions[key])
        }
        let index = parseInt(this.state.activeQuestionIndex) + 1;
        if (parseInt(this.state.activeQuestionIndex) < questions.length) {
            this.setState({activeQuestionIndex: ''+index+''})
        } else { 
            this.setState({activeQuestionIndex: ''+1+''})
        }
    }

    render() {
        return (
            // <RenderIf condition={true}>

            // </RenderIf>

            <div className="game-field">
                { this.state.endGame && <ModalFinishGame game={this.state.dbToStore[0]} modal={this.modalClose}/> }
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
                            { this.state.isOwner &&
                                <div className="addQuestion" onClick={this.createNewQuestion}>+</div>
                            }
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

                        </div>
                    </div>}
                    { this.state.isOwner &&
                        <div className='row container-for-buttons'>
                            <button className="show-cards game-button" onClick={this.calcAverage}><i className="fa fa-undo" aria-hidden="true"></i>Flip cards</button>
                            <button className="reset-cards game-button" onClick={this.resetCards}><i className="fa fa-repeat" aria-hidden="true"></i>Reset cards</button>
                            <button className="prev-question game-button" onClick={this.prevQuestion}><i className="fa fa-arrow-left" aria-hidden="true"></i>Previous question</button>
                            <button className="next-question game-button" onClick={this.nextQuestion}><i className="fa fa-arrow-right" aria-hidden="true"></i>Next question</button>
                        </div>
                    }
                <div className='row'>
                    <div className='container-for-vouting-cards col-sm-12 col-md-12'>
                        {fibNumbers.map((value, index) => <VoutingCard number={value} key={index}
                            className={this.checkActiveCard(value, index)}
                            onClick={this.changeActiveCard} />)}
                        <div className='col-sm-12 col-md-12 endGameContainer'>
                            { this.state.isOwner &&
                                <button className="endGame" onClick={this.endGame}>End Game</button>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(GameField)