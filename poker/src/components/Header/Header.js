import React from 'react';
import { withRouter } from 'react-router-dom';
import { socket } from '../../constants/consts';
// import './header.css';

import { DBtoStore } from '../../actions';
import store from '../GameField/store/index';

import headerBg from './header-bg.png';
import headerLogo from './logo_goit.png';
import Sasha from './Sasha1.jpg';
import Misha from './Misha.jpg';
import Dima from './Dima.jpg';
import Bella from './Bella.jpg';

import go from '../../img/header/go.png';
import it from '../../img/header/it.png';
import userpic from '../../img/header/user.jpg';

let style = {
    backgroundImage: `url(${headerBg})`
}
let logo = {
    backgroundImage: `url(${headerLogo})`
}
let ownerAvatar = {}
console.log(localStorage.getItem('username'), JSON.parse(localStorage.getItem('username')) == "Sasha")
switch (JSON.parse(localStorage.getItem('username'))) {
    case "Sasha":
        ownerAvatar = {
            backgroundImage: `url(${Sasha})`
        }
        break;
    case "michael":
        ownerAvatar = {
            backgroundImage: `url(${Misha})`
        }
        break;
    case "Dima":
        ownerAvatar = {
            backgroundImage: `url(${Dima})`
        }
        break;
    case "Bella":
        ownerAvatar = {
            backgroundImage: `url(${Bella})`
        }
        break;
    default:
        break;
}


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
    componentDiDMoutn() {
        switch (JSON.parse(localStorage.getItem('username'))) {
            case "Sasha":
                ownerAvatar = {
                    backgroundImage: `url(${Sasha})`
                }
                break;
            case "ktulho":
                ownerAvatar = {
                    backgroundImage: `url(${Misha})`
                }
                break;
            case "michael":
                ownerAvatar = {
                    backgroundImage: `url(${Misha})`
                }
                break;
            case "Dima":
                ownerAvatar = {
                    backgroundImage: `url(${Dima})`
                }
                break;
            case "Bella":
                ownerAvatar = {
                    backgroundImage: `url(${Bella})`
                }
                break;
            default:
                break;
        }
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
                    {/* <nav className="header__navigation">
                        <ul className="header__menu">
                            <li onClick={this.handleClick.bind(null, '/contacts')} className="header__item">
                                <a className="header__link">Contact</a>
                            </li>
                            <li onClick={this.handleClick.bind(null, '/about')} className="header__item">
                                <a className="header__link">About</a>
                            </li>
                        </ul>
                    </nav> */}
                </div>
                {localStorage.getItem('username') !== null
                    ? <div className="header__container-link-and-img">
                        <a  onClick={this.handleRedirect}>
                            <div className="header__image-block">
                                <img src={userpic} alt="user image" className="header__user-image" />
                            </div>
                            <p className="header__profile">{JSON.parse(localStorage.getItem('username'))}</p>
                            {/* <p className="header__profile">{this.state.playername}</p> */}
                        </a>
                    </div>
                    : null
                }
                {localStorage.getItem('username') !== null
                    ? <div className="header__container-link-and-img">
                        <div className="header__control">
                            {/* <a href="register.html" className="header__register-link">
                                Register
                            </a> */}
                            <a className="header__log-link" onClick={this.handleLogout}>
                                Log Out
                            </a>
                        </div>
                    </div>
                    // : this.state.playername
                    //     ? <div className="header__container-link-and-img">
                    //         <div className="header__control">
                    //             {/* <a href="register.html" className="header__register-link">
                    //                 Register
                    //             </a> */}
                    //             <a href="" className="header__log-link">
                    //                 Log In
                    //             </a>
                    //         </div>
                    // </div>
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

            //  <header style={style}>
            //    <div style={logo} className="gameLogo" onClick={this.handleLogoClick}></div>
            //     <nav className="header-nav headerForm">

            //         <ul className="left-menu">
            //             <li onClick={this.handleClick.bind(null, '/contacts')}><p>Contact</p></li>
            //             <li onClick={this.handleClick.bind(null, '/about')}><p>About</p></li>
            //         </ul>
            // {localStorage.getItem('username') !== null ?
            //     <div className="user-profile">
            //         <i className="fa fa-user-times fa-2x" aria-hidden="true"></i>
            //         <p className="user-logout" onClick={this.handleClearUsers}>Clear players</p>
            //     </div>
            //     : null}
            // {localStorage.getItem('username') !== null ?
            //             <div className="user-profile-with-logo">
            //                 <div className="user-profile">
            //                     <p className="user-name" onClick={this.handleRedirect} >{JSON.parse(localStorage.getItem('username'))}</p>
            //                     <p className="user-logout" onClick={this.handleLogout}>Log out</p>
            //                 </div>
            //                 <div className="ownerAvatar" style={ownerAvatar}></div>
            //             </div> :
            //             this.state.playername ?
            //                 <div className="user-profile">

            //                     <p className="user-name" onClick={this.handleRedirect} >{this.state.playername}</p>
            //                     <p className="user-logout" onClick={this.handleLogout}>Log out</p>
            //                 </div> :
            //                 <ul className="right-menu">
            //                     <li onClick={this.handleClick.bind(null, '/registration')}>Register</li>
            //                     <li onClick={this.handleClick.bind(null, '/login')}>Log in</li>
            //                 </ul>
            //         }
            //     </nav>
            // </header>
        )
    }
}

export default withRouter(Header)
