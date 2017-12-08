import React from 'react';
import fibNumbers from '../../constants/fibonachi';
import VoutingCard from './VoutingCard';
import UserCards from '../usersCards/index';

import './gameField.css';

export default class GameField extends React.Component {

    componentWillMount() {
        let id = JSON.stringify({ gameId: this.props.match.params.id });

        fetch('/fetchGame', { method: 'POST', headers: { "Content-Type": "application/json" }, body: id })
            .then(res => res.json())
            .then(res => {
                // this.props.DBtoStore(res);
                console.log("db from willmount", res)
            })
            .catch(res => console.log());
    }

    render() {
        console.log(fibNumbers);
        return (
            <div>
                 <div className='row'>

                 <div className='container-for-main-right-part col-sm-12 col-md-12'> 
                    <UserCards />
                    <button>Flip cards</button>
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