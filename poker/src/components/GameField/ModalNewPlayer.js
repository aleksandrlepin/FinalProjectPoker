import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { addPlayer } from '../../actions';
import { socket } from '../../constants/consts';
import store from '../../store/index';

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
    }
};
Modal.setAppElement('#root');


class ModalNewPlayer extends React.Component {

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    handlePlay = () => {
        this.setState({ modalIsOpen: false });
        let data = JSON.stringify({
            gameId: this.props.gameId,
            user: {
                name: this.refs.name.value.toLowerCase(),
                email: this.refs.email.value,
                //create array with empty answers to make it possible change answers through map in action SAVE_ANSWER
                //!!!will work for games less than 25 questions
                answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        });

        // Tell the server your username
        let player = {
            name: this.refs.name.value,
            email: this.refs.email.value
        }

        fetch(`/addPlayer`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                console.log('from modal', res.game, res.owner, ' player', player)
                socket.emit('add user', player);
                console.log('from addplayer', res)
                if (res.owner) {
                    this.props.history.push('/loginOwnGame');
                    localStorage.setItem('currentGameId', this.props.match.params.id);
                    // localStorage.setItem('isOwner', true);
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
                <form className="edit-story__form-edit" action="#">
                    <h1 className="edit-story__form-edit-title">
                        Join Game
                        </h1>
                    <div className="edit-story__edit-container-field">
                        <label className="edit-story__edit-form-label" htmlFor="name">Enter your name:</label>
                        <input className="edit-story__edit-form-input" ref="name" type="text" id="name" placeholder="name" required />
                    </div>
                    <div className="edit-story__edit-container-field">
                        <label className="edit-story__edit-form-label" ref="email" htmlFor="email">Enter your email:</label>
                        <input className="edit-story__edit-form-input" type="text" id="email" placeholder="email" required />
                    </div>
                    <div className="edit-story__edit-container-buttons">
                        <button className="edit-story__edit-cancel-button" onClick={this.handleCancel}>
                            Cancel
                            </button>
                        <button className="edit-story__edit-save-button" onClick={this.handlePlay}>
                            Join
                            </button>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default withRouter(ModalNewPlayer)
