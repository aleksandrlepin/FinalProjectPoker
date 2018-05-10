import React from 'react';
import { withRouter } from 'react-router-dom';
import { socket } from '../../constants/consts';

import { DBtoStore } from '../../actions';
import store from '../GameField/store/index';

import go from '../../img/header/go.png';
import it from '../../img/header/it.png';
import userpic from '../../img/header/user.jpg';


class Header extends React.Component {
    constructor() {

        super();
        this.state = { playername: '' }

        socket.on('login', (name) => {

            // localStorage.setItem('playername', JSON.stringify(name));
            this.setState({ playername: name.toLocaleUpperCase() })
            // this.setState({playerName: JSON.parse(localStorage.getItem('playername'))})

            console.log('socket from header', name, this.state.playername)
            console.log('player', name);
        });
    }

    handleClick = (href) => {
        this.props.history.push(href);
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/')
    }

    handleLogoClick = () => {
        if (localStorage.getItem('isOwner')) {
            this.props.history.push('/dashboard')
        } else {
            this.props.history.push('/')
        }
    }
    handleRedirect = () => {
        this.props.history.push('/dashboard')
    }
    handleClearUsers = () => {
        let gameId = JSON.stringify({ gameId: JSON.parse(localStorage.getItem('gameId')) });
        console.log(gameId)
        fetch('/clearPlayers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: gameId })
            .then(res => res.json())
            .then(res => {
                store.dispatch(DBtoStore(res));
                socket.emit('clearPlayers')

            })
            .catch(err => console.log(err))
    }

    render() {
        console.log('rerender header', this.state.playername)
        return (
            <header className="header">
                <div className="header__container">
                    <a onClick={this.handleLogoClick}>
                        <img className="header__logo-go" src={go} alt="go" />
                        <img className="header__logo-it" src={it} alt="it" />
                    </a>
                </div>
                {localStorage.getItem('username') !== null
                    ? <div className="header__container-link-and-img">
                        <a  onClick={this.handleRedirect}>
                            <div className="header__image-block">
                                <img src={userpic} alt="user" className="header__user-image" />
                            </div>
                            <p className="header__profile">{JSON.parse(localStorage.getItem('username'))}</p>
                        </a>
                    </div>
                    : null
                }
                {localStorage.getItem('username') !== null
                    ? <div className="header__container-link-and-img">
                        <div className="header__control">
                            <a className="header__log-link" onClick={this.handleLogout}>
                                Log Out
                            </a>
                        </div>
                    </div>
                    : <div className="header__container-link-and-img">
                        <div className="header__control">
                            <a className="header__register-link" onClick={this.handleClick.bind(null, '/registration')}>
                                Register
                            </a>
                            <a className="header__log-link" onClick={this.handleClick.bind(null, '/login')}>
                                Log In
                            </a>
                        </div>
                    </div>
                }
            </header>
        )
    }
}

export default withRouter(Header)
