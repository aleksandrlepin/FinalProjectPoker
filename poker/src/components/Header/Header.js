import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { socket } from '../../constants/consts';

import { DBtoStore } from '../../actions';
import store from '../../store/index';
import {storage, storageRef} from '../../firebase';
import {getUserpic} from '../../actions/index';

import go from '../../img/header/go.png';
import it from '../../img/header/it.png';
import userpic from '../../img/header/user.jpg';


class Header extends React.Component {
	constructor() {

		super();
		this.state = { userpicUrl: '' }

	}

	componentDidMount() {
		if(!localStorage.getItem('usermane')){
			const email = JSON.parse(localStorage.getItem('useremail'));
			const name = JSON.parse(localStorage.getItem('username'));
			storage.refFromURL(`gs://pokergoit.appspot.com/userpics/${email}/${name}`)
			.getDownloadURL()
			.then((url) => {
				// localStorage.setItem('avatar_url', url);
				store.dispatch(getUserpic(url));
			});
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
		// console.log('SOCET', socket);
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
								{this.props.userPic &&
									<div className="header__image-block">
										<img src={this.props.userPic} alt="user" className="header__user-image" />
									</div>
								}
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

const mstp = state => ({
	userPic: state.userPic,
});

export default withRouter(connect(mstp, null)(Header));
