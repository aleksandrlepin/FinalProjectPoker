import React from 'react';
// import UserCards from '../usersCards/index';
import { withRouter } from 'react-router-dom';
// import './index.css';
import "./menu.css";

class Menu extends React.Component {

	handleClickCreate = () => {
		this.props.history.push("/newgame")
	};

	handleAccount = () => {
		this.props.history.push("/")
	};
    handleSavedGames = () => {
        this.props.history.push("/")
    };

    render () {
        return (
			<div className="navbar">
				<ul  id="menuList">
					<li  onClick = {this.handleClickCreate}>Create new game</li>
					<hr />
					<li  onClick = {this.handleSavedGames}>Saved games</li>
					<hr/>
					<li  onClick = {this.handleAccount}>Accont</li>
				</ul>
			</div>
            
        )
    }
}
export default withRouter(Menu);
