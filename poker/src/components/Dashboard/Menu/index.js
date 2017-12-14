import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';


class Menu extends React.Component {

	handleClickCreate = () => {
		this.props.history.push("/newgame")
	};

	handleAccount = () => {
		this.props.history.push("/")
	};
    handleSavedGames = () => {
        this.props.history.push("/dashboard")
    };

    render () {
        return (
			<div className="navbar">
				<ul className="nav">
					<li className="nav-item" onClick = {this.handleClickCreate}>Create new game</li>
					<li className="nav-item" onClick = {this.handleSavedGames}>Saved games</li>
					<li className="nav-item" onClick = {this.handleAccount}>Accont</li>
				</ul>
			</div>
            
        )
    }
}
export default withRouter(Menu);
