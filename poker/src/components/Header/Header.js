import React from 'react';
import { withRouter } from 'react-router-dom';
import store from '../GameField/store/index';
import './header.css';
import headerBg from'./header-bg.png';


let style = {
    backgroundImage: `url(${headerBg})`  
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState().authUser;
        console.log('from header this.state', this.state);

        store.subscribe(() => {
            this.setState({ authUser: store.getState().authUser });
            console.log('i am from subcribe>>>>>>>>>>>>>>>>>>> this.state.authuser', this.state.authUser)
        });
    }

    handleClick = (href) => {
        this.props.history.push(href);
    }


    render() {
        return (
            <header style={style}>
             
                <nav className="header-nav">
                    <ul className="left-menu">
                        <li onClick={this.handleClick.bind(null, '/contact')}>Contact</li>
                        <li onClick={this.handleClick.bind(null, '/about')}>About</li>
                    </ul>
                    {this.state !== null ? 
                    <div className="user-profile">
                        <div className="user-avatar"></div>
                        <div className="user-name">{this.state.authUser.email}</div>
                    </div> :
                    <ul className="right-menu">
                        <li onClick={this.handleClick.bind(null, '/registration')}>Register</li>
                        <li onClick={this.handleClick.bind(null, '/login')}>Log in</li>
                    </ul>
                    }
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)