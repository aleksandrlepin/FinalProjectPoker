import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { DBtoStore, addPlayer } from '../../actions';
import { socket } from '../../constants/consts';
import openSocket from 'socket.io-client';
import store from './store/index';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }
};
Modal.setAppElement('#root');


class ModalNewPlayer extends React.Component {

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    handlePlay = () => {
        this.setState({ modalIsOpen: false });
        let id = JSON.stringify({ gameId: this.props.gameId });
        let data = JSON.stringify({
            gameId: this.props.gameId,
            user: {
                name: this.refs.name.value,
                email: this.refs.email.value
            }
        });

        // Tell the server your username
        let name = this.refs.name.value;
        socket.emit('add user', name);

        fetch(`/addPlayer`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                console.log('from modal', res.game, res.owner)
                if (res.owner) {
                    this.props.history.push('/loginOwnGame');
                    localStorage.setItem('currentGameId', this.props.match.params.id);
                    localStorage.setItem('isOwner', true);
                    localStorage.setItem('username', JSON.stringify(res.username));
                } else {
                    store.dispatch(addPlayer(res.game));
                }
                
            })
            .catch(err => console.log(err));



    }



    handleCancel = () => {
        this.setState({ modalIsOpen: false });
        let id = JSON.stringify({ gameId: this.props.gameId });
    }
    render() {

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="No Overlay Click Modal"
            >

                <h2 id="modal" ref={subtitle => this.subtitle = subtitle}>Join Game</h2>

                <form>
                    <label>Enter your name:
                     <br></br>
                        <input ref="name" />
                    </label>
                    <br></br>
                    <label>Enter your email:
                     <br></br>
                        <input ref="email" />
                    </label>
                    <br></br>

                </form>
                <button onClick={this.handleCancel}>cancel</button>
                <button onClick={this.handlePlay}>play</button>
            </Modal>
        )
    }
}

export default withRouter(ModalNewPlayer)