import React, { Component } from 'react';
import './contacts.css';
import './loader.css';

export default class Contacts extends Component {
	state = {
		users : ['MichaeIK', 'dmitriyamelchenko', 'bella007', 'Soverdo'],
		usersRes : {}
	}

	componentDidMount() {

		this.uploadData('matveychuk');
	}

	uploadData = (name) => {
		fetch(`https://api.github.com/users/${name}`, { method: 'GET', headers: { "Content-Type": "application/json" }})
		.then(res => res.json())
		.then(res => {
			if (res) {
				let user = {
					id: res.id,
					login: res.login,
					avatar_url: res.avatar_url,
					html_url: res.html_url
				}
				this.setState({ usersRes: [...this.state.usersRes, user] });
			}
				if (this.state.usersRes.length < this.state.users.length +1) this.uploadData(this.state.users[this.state.usersRes.length -1])
		})
		.catch(res => console.log('error', res));
	}


	render() {
		console.log(this.state.usersRes)
		return (
			<div className="dev-wrap">

			{this.state.usersRes.length > 2 ?
				this.state.usersRes && this.state.usersRes.map((item, index) => {
					return (
						<div className="dev-card" key={index}>
							<a className="dev-link" href={`https://github.com/${item.login}`}><h3 className="dev-login">{item.login}</h3></a>
							<a className="dev-link" href={`https://github.com/${item.login}`}><img className="dev-avatars" src={item.avatar_url} alt="dev-avatars"></img></a>
							<a className="dev-link" href={`https://github.com/${item.login}`}>{item.html_url}</a>
						</div>
					)
				}) : <div className="loader-wrap">
						<div className="loader">
							<svg>
								<defs>
									<filter id="goo">
										<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
										<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
										<feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
									</filter>
								</defs>
							</svg>
						</div>
					</div>
			}


			</div>
		);
	}
}
