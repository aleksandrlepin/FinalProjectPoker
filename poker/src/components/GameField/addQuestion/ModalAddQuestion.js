import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
// import './ModalAddQuestion.css';
// eslint-disable-next-line
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
        border: 0,
        backgroundColor: "transparent",
    }
};
Modal.setAppElement('#root');




class ModalAddQuestion extends React.Component {

    componentWillMount() {


    }

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    // afterOpenModal = () => {
    //     this.subtitle.style.color = '#09243b';
    // }

    handleAddQuestion = () => {
        // ---------Proverka_poley------
        let result = "";

        if (this.refs.question.value === "") {
            this.refs.question.style.boxShadow = "0px 0px 2px 2px #ff0000";

        }
        else {
            this.refs.question.style.boxShadow = "none";
            result = this.refs.question.value;
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
                <main class="edit-story">
                    <div class="edit-story__container-form-edit">
                        <form class="edit-story__form-edit" action="#">
                            <h1 class="edit-story__form-edit-title"> Add new question </h1>
                            <div class="edit-story__edit-container-field">
                                <input class="edit-story__edit-form-input"
                                    ref="question"
                                    id="addqusetion-input"
                                    type="text"
                                    placeholder="Question"
                                />
                            </div>
                            <div class="edit-story__edit-container-buttons">
                                <button class="edit-story__edit-cancel-button" onClick={this.handleCancel}>
                                    Cancel
                                </button>
                                <button class="edit-story__edit-save-button" onClick={this.handleAddQuestion}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </main>

                {/* <div id="modal" ref={subtitle => this.subtitle = subtitle}>Add new question</div>
                <div className="modalButtonWrap">
                    <input
                        ref="question"
                        id="addqusetion-input"
                        type="text"
                        placeholder="  Question"
                    />
                    <div className="addquestion-buttons">
                        <button id="addqusetion-left" className="modalEndGameButton" onClick={this.handleCancel}>Back to game</button>
                        <button id="addqusetion-right" className="modalEndGameButton" onClick={this.handleAddQuestion}>Add question</button>
                    </div>
                </div> */}
            </Modal>
        )
    }
}

export default withRouter(ModalAddQuestion)
