import React from 'react';
import Menu from './Menu/index';
import { withRouter } from 'react-router-dom';

import './index.css';
import { link } from '../../constants/consts.js'


class Dashboard extends React.Component {

    state = {
        games: [],
        owner: '',
        rerender: false
    }

    componentWillMount() {

        if (localStorage.getItem('useremail')) {
            let owner = JSON.stringify({'email': localStorage.getItem('useremail'), 'token': JSON.parse(localStorage.getItem('token'))});
            fetch('/uploadGamesByOwner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: owner
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success === false) {
                        this.props.history.push('/login');
                    } else {
                        this.setState({ games: res, rerender: false })
                    }
                })
                .catch(err => console.log(err))
        } else {
            this.props.history.push('/login');
        }
    }
   
    handleClickDel = (e, data) => {
        let id = JSON.stringify({ 'id': data });
        fetch('/delgame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: id
        })
            .catch(err => console.log(err))

        this.state.games.map((item, index) => {
           
            if (item._id === data) {
                let newState = this.state.games.filter((item) => (item._id !== data))
                this.setState({ games: newState })
            }
        })
    }

    render() {
        return (
            <div className="row windowSavedGame">
                {/* <ModalLogin ownerOfGame={this.returnOwnerName} /> */}
                <div className="container" key={this.state.rerender}>
                    <div className="col-lg-3 col-sm-12">
                        <Menu />
                    </div>
                    <div className="col-lg-9 col-sm-12 fieldSavedGames">
                        {this.state.games.map((item, index) => {
                            let gameLinkg = '' + link + '/play/game/' + item._id + ''
                            return (
                                <div className="gameCard" key={index}>
                                    <div className="col-10">
                                        <p className="gameName"><span>[ {item.nameGame} ] </span>{}</p>
                                        <div className="forURL">
                                            {/*<span>Link to game: </span>  */}
                                            <a href={gameLinkg}>{link}/play/game/{item._id}</a>
                                        </div>
                                        <p><span>Description: </span>{item.description}</p>
                                    </div>
                                    <div className="col-2">
                                        <div className="delButton" onClick={((e) => this.handleClickDel(e, item._id))}>
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

export default withRouter(Dashboard)