import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import './ModalAddQuestion.css';
let questions = [];

const customStylesForm = {

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




class ModalAddQuestion extends React.Component {

    componentWillMount () {


    }

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#09243b';
    }

    handleAddQuestion = () => {
        // ---------Proverka_poley------
        let result="";

        if (this.refs.question.value ==="") {
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";

        }
        else {
            this.refs.question.style.boxShadow = "none";
            result=this.refs.question.value;
        // --------------
        this.props.modal();
        this.props.addNewQuestion(result);
        this.setState({ modalIsOpen: false });

        }
    }

    handleCancel = () => {
        questions = [];
        this.setState({ modalIsOpen: false });
        this.props.modal();
    };
    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStylesForm}
                contentLabel="No Overlay Click Modal"
                >
                <div id="modal" ref={subtitle => this.subtitle = subtitle}>Add new question</div>
                <div className="modalButtonWrap">
                    <textarea
                        ref="question"
                        id="questionsValue"
                        type="text"
                        placeholder="  Question"
                    />
                    <div className = "buttonAddQuestionForm">
                        <button className="modalEndGameButton" onClick={this.handleCancel}>Back to game</button>
                        <button className="modalEndGameButton" onClick={this.handleAddQuestion}>Add question</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(ModalAddQuestion)