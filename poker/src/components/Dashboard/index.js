import React from 'react';
import Menu from './Menu/index';
import ModalLogin from './Modal/ModalLogin';
import './index.css';
import { link } from '../../constants/consts.js'

export default class Dashboard extends React.Component {

    state = {
        games : [],
        owner : '',
        rerender : false
    }

    returnOwnerName = (name) => {
        this.setState({'owner':name})
        console.log('start fetch')
        let nameOfOwner = JSON.stringify({'name' : name});

        fetch('/uploadgame', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: nameOfOwner
        })
            .then(res => res.json())
            .then(res => this.setState({games : res, rerender : false }))
            .catch(err => console.log(err))
    };

    handleClick = (e, data) => {
        let id = JSON.stringify({'id' : data});
        fetch('/delgame', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: id
        })
        this.returnOwnerName(this.state.owner)
        this.setState({rerender : true})
    }

    render () {
        console.log(this.state.rerender)
        return (
            <div className="row">
                <ModalLogin ownerOfGame={this.returnOwnerName} />
                <div className="container" key={this.state.rerender}>
                    <div className="col-lg-2 col-sm-12">
                        <Menu />
                    </div>
                    <div className="col-lg-8 col-sm-12">
                    {this.state.games.map((item, index) => {
                        let gameLinkg = ''+link+'/play/game/'+item._id+''
                        return (
                            <div className="gameCard" key={index}>
                                <div className="col-10">
                                    <p><span>Game name: </span>{item.nameGame}</p>
                                    <div className="forURL">
                                        <span>Link to game: </span>  <a href={gameLinkg}>{link}/play/game/{item._id}</a>
                                    </div>
                                    <p><span>Description: </span>{item.description}</p>
                                </div>
                                <div className="col-2">
                                    <div className="delButton" onClick={((e) => this.handleClick(e, item._id))}>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                    </div>
                </div>
            </div>
        ) 
        
    }
}