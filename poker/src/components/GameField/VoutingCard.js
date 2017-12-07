import React from 'react';
import './voutingCard.css';

export default class VoutingCard extends React.Component {

    render() {
        return (
            <div className='voutingCard'>
                {this.props.number}
            </div>
        )

    }
}