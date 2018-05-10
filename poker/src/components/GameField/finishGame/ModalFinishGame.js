import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
// import './finishGame.css';
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
    }
};
Modal.setAppElement('#root');




class ModalFinishGame extends React.Component {

    componentWillMount() {
        if (this.props.game) {
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

                <h1 className="summary__primarititle" ref={subtitle => this.subtitle = subtitle}>Game summary</h1>
                <h2 className="summary__secondarytitle">{this.props.game.nameGame}</h2>
                <div className="summary__result">
                    <ul className="summary__result-list">
                        {questions.map((item, index) => {
                            return (
                                <li key={item + index} className="summary__result-item"> <span>{index + 1}. {item} </span><span className="summary__result-points">{this.props.game.answers[index + 1]}</span></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="summary__box">
                    <button className="summary__box-btn" onClick={this.handleBack}>Back to game</button>
                    <button className="summary__box-btn" onClick={this.handleEnd}>End this game</button>
                </div>
            </Modal>
        )
    }
}

export default withRouter(ModalFinishGame)
