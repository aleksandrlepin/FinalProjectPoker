import React from 'react';
import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCard from '../usersCards/UserCard';
import { DBtoStore } from '../../actions';
import store from './store/index';
import './gameField.css';


const URL = "http://localhost:3000";

class GameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();

        fetch(`${URL}/games/${this.props.match.params.id}`, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                store.dispatch(DBtoStore(res));
            })
            .catch(err => console.log(err));

        store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    handleIncrement = () => {
        console.log('hi');
        store.dispatch({ type: 'INCREMENT' });
    }
    componentWillMount() {

    }

    componentWillUnmount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    render() {
        console.log('this.state.dbToStore[0] from render', this.state.dbToStore[0])
        return (
            <div>
                <div className='row'>
                    <div className='container-for-questions col-sm-12 col-md-3'>

                    </div>
                    <div className='container-for-main-right-part col-sm-12 col-md-9'>

                        {this.state.dbToStore[0] === undefined ?
                            null :
                            <div className="container-for-user-cards">
                                {this.state.dbToStore[0].users.map((user, index) => {
                                    return <UserCard user={user} key={index}/>
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