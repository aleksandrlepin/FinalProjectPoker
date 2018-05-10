import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

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

    componentDidUpdate() {
    }

    state = { modalIsOpen: true };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    // afterOpenModal = () => {
    //     this.subtitle.style.color = '#09243b';
    // }

    handleKeypressAddQuestion = (event) => {
        if (event.type === 'keypress' && event.key === 'Enter') {
            this.addQuestion();
        }
    }

    handleOnclickAddQuestion = (event) => {
        event.preventDefault();
        this.addQuestion();
    }

    addQuestion = () => {
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
                    <div className="edit-story__container-form-edit">
                        <form className="edit-story__form-edit" action="#">
                            <h1 className="edit-story__form-edit-title"> Add new question </h1>
                            <div className="edit-story__edit-container-field">
                                <input className="edit-story__edit-form-input"
                                    ref='question'
                                    id="addqusetion-input"
                                    type="text"
                                    placeholder="Question"
                                    onKeyPress={this.handleKeypressAddQuestion}
                                />
                            </div>
                            <div className="edit-story__edit-container-buttons">
                                <button className="edit-story__edit-cancel-button" onClick={this.handleCancel}>
                                    Cancel
                                </button>
                                <button className="edit-story__edit-save-button" onClick={this.handleOnclickAddQuestion}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
            </Modal>
        )
    }
}

export default withRouter(ModalAddQuestion)
