import React from 'react';
import openSocket from 'socket.io-client';
import { socket } from '../../constants/consts';

import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCard from '../usersCards/UserCard';
import { DBtoStore, updateStore } from '../../actions';
import store from './store/index';
import './gameField.css';
import ModalNewPlayer from './ModalNewPlayer';


const URL = "http://localhost:3000";

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        let gameId = this.props.match.params.id;
        fetch(`${URL}/games/${gameId}`, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                store.dispatch(DBtoStore(res));
            })
            .catch(err => console.log(err));

        store.subscribe(() => {
            this.setState(store.getState());
            console.log('i am from subcribe>>>>>>>>>>>>>>>>>>> this.state', this.state)
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
            var message = "Welcome " + data;
            log(message);
        });

    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }


    render() {
        // console.log('this.state.dbToStore[0] from render', this.state.dbToStore[0])
        return (
            <div>
                <ModalNewPlayer gameId={this.props.match.params.id}/>
                <div className='row'>
                    <div className='container-for-questions col-sm-12 col-md-3'>

                    </div>
                    <div className='container-for-main-right-part col-sm-12 col-md-9'>

                        {this.state.dbToStore[0] === undefined ?
                            null :
                            <div className="container-for-user-cards">
                                <div id='socket-msg'></div>
                                {this.state.dbToStore[0].users.map((user, index) => {
                                    return <UserCard user={user} key={index} />
                                })}
                            </div>}
                        <button className="show-cards">Flip cards</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='container-for-vouting-cards col-sm-12 col-md-12'>
                        {fibNumbers.map((value, index) => {
                            return <VoutingCard number={value} key={index} />
                        })}
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