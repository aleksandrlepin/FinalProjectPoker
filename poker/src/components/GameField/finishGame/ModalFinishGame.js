import React, { Fragment } from 'react';
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
        // backgroundColor: '#09243b'
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

                {/* <main class="summary"> */}
                    {/* <section class="summary__case"> */}
                        <h1 class="summary__primarititle" ref={subtitle => this.subtitle = subtitle}>Game summary</h1>
                        <h2 class="summary__secondarytitle">{this.props.game.nameGame}</h2>
                        <div class="summary__result">
                            <ul class="summary__result-list">
                                {questions.map((item, index) => {
                                    return (
                                        <li class="summary__result-item"> <span>{index + 1}. {item} </span><span className="summary__result-points">{this.props.game.answers[index + 1]}</span></li>
                                        // <p key={index}><span className="numberModal">{index + 1}</span>{item}<span className="answersModal">{this.props.game.answers[index + 1]}</span></p>
                                        // <Fragment>
                                        //     <li class="summary__result-item"> <span>{index + 1}.</span> {item}</li>
                                        //     <li class="summary__result-item">{this.props.game.answers[index + 1]}</li>
                                        // </Fragment>
                                    )
                                })}
                                {/* <li class="summary__result-item"> <span>1.</span> Story1</li>
                                <li class="summary__result-item"><span>2.</span> Story2</li>
                                <li class="summary__result-item">8</li>
                                <li class="summary__result-item">13</li> */}
                            </ul>
                        </div>
                        <div class="summary__box">
                            <button class="summary__box-btn" onClick={this.handleBack}>Back to game</button>
                            <button class="summary__box-btn" onClick={this.handleEnd}>End this game</button>
                        </div>
                    {/* </section> */}
                {/* </main> */}
            </Modal>
        )
    }
}

export default withRouter(ModalFinishGame)
