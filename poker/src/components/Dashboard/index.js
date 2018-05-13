import React from 'react';
import Game from './Game/index';
import { withRouter } from 'react-router-dom';

import { link } from '../../constants/consts.js'


class Dashboard extends React.Component {

    state = {
        games: [],
        owner: '',
        rerender: false
    }

    componentWillMount() {

        if (localStorage.getItem('useremail')) {
            let owner = JSON.stringify({ 'email': localStorage.getItem('useremail'), 'token': JSON.parse(localStorage.getItem('token')) });
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

    handleClickCreate = () => {
        this.props.history.push("/newgame")
    };

    handleAccount = () => {
        this.props.history.push("/")
    };
    handleSavedGames = () => {
        this.props.history.push("/dashboard")
    };

    render() {
        let gameLinkg = '' + window.location.origin + '/play/game/';
        // let gameLinkg = '' + link + '/play/game/';
        console.log('gameLinkg: ', gameLinkg);
        console.log('games', this.state.games);
        return (
            <main className="save-game">
                <section className="result">

                    <button className="result__button-saved button-saved" onClick={this.handleSavedGames} >
                        <svg className="button-saved__svg-list" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 496.158 496.158" style={{ enableBackground: "new 0 0 496.158 496.158" }} xmlSpace="preserve" width="512px" height="512px"><g />
                            <path className="button-saved__svg-list_active-path" d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085  c0,137.002,111.07,248.07,248.083,248.07C385.088,496.155,496.158,385.087,496.158,248.085z" data-original="#E04F5F" data-old_color="#ff6c00" /><g />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,226.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,230.558,398.102,226.079,392.579,226.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,226.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,230.558,133.102,226.079,127.579,226.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,157.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,161.558,398.102,157.079,392.579,157.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,157.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,161.558,133.102,157.079,127.579,157.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M392.579,295.079h-225.5c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h225.5   c5.523,0,10-4.477,10-10v-24C402.579,299.558,398.102,295.079,392.579,295.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                            <path className="button-saved__svg-list_secondary-path" d="M127.579,295.079h-24c-5.523,0-10,4.479-10,10v24c0,5.523,4.477,10,10,10h24c5.523,0,10-4.477,10-10   v-24C137.579,299.558,133.102,295.079,127.579,295.079z" data-original="#FFFFFF" data-old_color="#E9E5E2" />
                        </svg>
                        Saved game
                    </button>
                    <div className="result__information">
                        <h1 className="result__title">Saved games</h1>
                        {this.state.games.map((item, index) => {
                            return (
                                < Game
                                    key={item.nameGame}
                                    id={item._id}
                                    nameGame={item.nameGame}
                                    gameLink={gameLinkg + item._id}
                                    description={item.description}
                                    onClick={this.handleClickDel}
                                />
                            )
                        })}

                    </div>

                    <button className="result__button-create button-create" onClick={this.handleClickCreate} >
                        <svg className="button-create__svg-plus" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve" width="512px" height="512px">
                            <circle className="button-create__svg-plus_active-path" cx="256" cy="256" r="256" data-original="#25B6D2" data-old_color="#F9F8F8" />
                            <rect className="button-create__svg-plus_secondary-path" x="240" y="120" width="40" height="280" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                            <rect className="button-create__svg-plus_secondary-path" x="120" y="240" width="280" height="40" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                        </svg>
                        Create game
                    </button>
                </section>
            </main>
        )
    }
}

export default withRouter(Dashboard)
