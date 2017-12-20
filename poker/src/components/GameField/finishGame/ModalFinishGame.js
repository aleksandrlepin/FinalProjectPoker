import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import './finishGame.css';
let questions = [];

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




class ModalFinishGame extends React.Component {

    componentWillMount () {
        if(this.props.game) {
            for (let key in this.props.game.questions) {
                questions.push(this.props.game.questions[key])
            }
        }
    
    }

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#09243b';
    }

    handleEnd = () => {
        this.setState({ modalIsOpen: false });
        this.props.history.push('/dashboard');
    }

    handleBack = () => {
        questions = [];
        this.setState({ modalIsOpen: false });
        this.props.modal();
        this.props.history.push(`/play/game/${this.props.game._id}`);
    }
    render() {
        console.log(this.props.game)
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="No Overlay Click Modal"
            >

                <div id="modal" ref={subtitle => this.subtitle = subtitle}>Game summary</div>
                <h2 className="modalGameName">{this.props.game.nameGame}</h2>
                <div className="modalEndGameBox">
                    {questions.map((item, index) => { 
                        return (
                            <p key={index}><span className="numberModal">{index+1}</span>{item}<span className="answersModal">{this.props.game.answers[index+1]}</span></p>
                        )
                    })}
                </div>
                <div className="modalButtonWrap">
                    <button className="modalEndGameButton" onClick={this.handleBack}>Back to game</button>
                    <button className="modalEndGameButton" onClick={this.handleEnd}>End game</button>
                </div>
            </Modal>
        )
    }
}

export default withRouter(ModalFinishGame)