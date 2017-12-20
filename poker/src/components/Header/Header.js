import React from 'react';
import { withRouter } from 'react-router-dom';
import { socket } from '../../constants/consts';
import './header.css';
import headerBg from'./header-bg.png';
import headerLogo from'./logo.png';


let style = {
    backgroundImage: `url(${headerBg})` 
}
let logo = {
    backgroundImage: `url(${headerLogo})` 
}

class Header extends React.Component {
    constructor() {
        super();
        this.state = {playername: ''}

        socket.on('login', (name) => {

            // localStorage.setItem('playername', JSON.stringify(name));
            this.setState({playername: name.toLocaleUpperCase()})
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

    render() {
        console.log('rerender header', this.state.playername)
        return (
            <header style={style}>
               <div style={logo} className="gameLogo" onClick={this.handleLogoClick}></div>
                <nav className="header-nav">
                
                    <ul className="left-menu">
                        <li onClick={this.handleClick.bind(null, '/contact')}><p>Contact</p></li>
                        <li onClick={this.handleClick.bind(null, '/about')}><p>About</p></li>
                    </ul>
                    {localStorage.getItem('username') !== null ? 
                    <div className="user-profile">
                       
                        <p className="user-name" onClick={this.handleRedirect} >{JSON.parse(localStorage.getItem('username'))}</p>
                        <p className="user-logout" onClick={this.handleLogout}>Log out</p>
                    </div> :
                    this.state.playername ?
                    <div className="user-profile">
                    
                     <p className="user-name" onClick={this.handleRedirect} >{this.state.playername}</p>
                     <p className="user-logout" onClick={this.handleLogout}>Log out</p>
                 </div> :
                    <ul className="right-menu">
                        <li onClick={this.handleClick.bind(null, '/registration')}>Register</li>
                        <li onClick={this.handleClick.bind(null, '/login')}>Log in</li>
                        <li onClick={this.handleClick.bind(null, '/login')}>{this.state.playername}</li>
                    </ul>
                    }
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)