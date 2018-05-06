import React from 'react';
// import Menu from './Menu/index';
import Game from './Game/index';
import { withRouter } from 'react-router-dom';

// import './index.css';
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
        let gameLinkg = '' + link + '/play/game/';
        console.log('gameLinkg: ', gameLinkg);
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

                        {/* <button className="result__button-game">Create new game</button> */}
                    </div>

                    <button className="result__button-create button-create" onClick={this.handleClickCreate} >
                        <svg className="button-create__svg-plus" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve" width="512px" height="512px">
                            <circle className="button-create__svg-plus_active-path" cx="256" cy="256" r="256" data-original="#25B6D2" data-old_color="#F9F8F8" />
                            <rect className="button-create__svg-plus_secondary-path" x="240" y="120" width="40" height="280" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                            <rect className="button-create__svg-plus_secondary-path" x="120" y="240" width="280" height="40" data-original="#FFFFFF" data-old_color="#EEE4E0" />
                        </svg>
                        Create game
                    </button>
                    {/* <button className="result__button-account button-account" onClick={this.handleAccount} >
                        <svg className="button-account__settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.158 496.158" width="512" height="512">
                            <path className="button-account__settings_active-path" d="M496.158 248.085C496.158 111.064 385.088.003 248.082.003 111.07.003 0 111.063 0 248.085c0 137.002 111.07 248.07 248.083 248.07 137.005 0 248.075-111.068 248.075-248.07z" data-original="#32BEA6" data-old_color="#FFFFFF" fill="#ffb200" />
                            <path className="button-account__settings_secondary-path" d="M408.326 267.403v-38.649l-36.572-11.494a126.656 126.656 0 0 0-14.476-34.756l17.779-34.071-27.332-27.33-34.171 17.828a126.71 126.71 0 0 0-34.588-14.309l-11.562-36.789h-38.652l-11.562 36.789a126.705 126.705 0 0 0-34.586 14.309l-34.172-17.828-27.331 27.332 17.778 34.069a126.647 126.647 0 0 0-14.472 34.756l-36.575 11.494v38.649l36.431 11.451a126.786 126.786 0 0 0 14.468 35.084l-17.63 33.784 27.332 27.331 33.688-17.575a126.636 126.636 0 0 0 35.251 14.636l11.379 36.211h38.652l11.38-36.211a126.65 126.65 0 0 0 35.254-14.636l33.688 17.575 27.332-27.331-17.628-33.784a126.782 126.782 0 0 0 14.466-35.084l36.431-11.451zM248.08 332.899c-46.697 0-84.552-37.855-84.552-84.553 0-46.695 37.855-84.551 84.552-84.551 46.694 0 84.549 37.855 84.549 84.551 0 46.698-37.855 84.553-84.549 84.553z" data-original="#FFFFFF" data-old_color="#DDDCDC" fill="#fff" />
                        </svg>
                        My account
                    </button> */}

                </section>
            </main>

            // <div className="row wrapper-dashboard">
            //     <div className="windowSavedGame">
            //         <div className="container1" key={this.state.rerender}>
            //             <div className="col-lg-3 col-sm-12">
            //                 <Menu />
            //             </div>
            //             <div className="col-lg-9 col-sm-12 fieldSavedGames">
            //                 {this.state.games.map((item, index) => {
            // let gameLinkg = '' + link + '/play/game/' + item._id + ''
            //                     return (
            //                         <div className="gameCard" key={index}>
            //                             <div className="col-10">
            //                                 <p className="gameName"><span>[ {item.nameGame} ] </span>{}</p>
            //                                 <div className="forURL">
            //                                     {/*<span>Link to game: </span>  */}
            //                                     <a href={gameLinkg}>{link}/play/game/{item._id}</a>
            //                                 </div>
            //                                 <p><span>Description: </span>{item.description}</p>
            //                             </div>
            //                             <div className="col-2">
            //                                 <div className="delButton" onClick={((e) => this.handleClickDel(e, item._id))}>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     )

            //                 })}
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )

    }
}

export default withRouter(Dashboard)
