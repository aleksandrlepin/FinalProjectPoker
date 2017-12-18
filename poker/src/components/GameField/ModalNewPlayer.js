import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { addPlayer } from '../../actions';
import { socket } from '../../constants/consts';
import store from './store/index';
import './modal.css'


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
        padding: '20px',
        backgroundColor: '#09243b'
    }
};
Modal.setAppElement('#root');


class ModalNewPlayer extends React.Component {

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#09243b';
    }

    handlePlay = () => {
        this.setState({ modalIsOpen: false });
        let data = JSON.stringify({
            gameId: this.props.gameId,
            user: {
                name: this.refs.name.value,
                email: this.refs.email.value,
                //create array with empty answers to make it possible change answers through map in action SAVE_ANSWER 
                //!!!will work for games less than 25 questions
                answers: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
        });

        // Tell the server your username
        let name = this.refs.name.value;
        

        fetch(`/addPlayer`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                console.log('from modal', res.game, res.owner)
                socket.emit('add user', name);
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

                <div id="modal" ref={subtitle => this.subtitle = subtitle}>Join Game</div>

                <form>
                    <p><label className="modal-label">Enter your name:</label></p>
                    <p><input className="modal-input" ref="name" placeholder="player nickname" /></p>
                    <p><label className="modal-label">Enter your email:</label></p>
                    <p><input className="modal-input" ref="email" placeholder="email"/></p>
                </form>
                <button className="modal-button" onClick={this.handleCancel}>cancel</button>
                <button className="modal-button" onClick={this.handlePlay}>play</button>
            </Modal>
        )
    }
}

export default withRouter(ModalNewPlayer)