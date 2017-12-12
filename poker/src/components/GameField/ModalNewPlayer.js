import React from 'react';
import Modal from 'react-modal';
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


export default class ModalNewPlayer extends React.Component {

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

        let newBD = {};
        fetch(`/addPlayer`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                store.dispatch(addPlayer(res));
            })
            .catch(err => console.log(err));

        // Tell the server your username
        let name = this.refs.name.value;
        socket.emit('add user', name);

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