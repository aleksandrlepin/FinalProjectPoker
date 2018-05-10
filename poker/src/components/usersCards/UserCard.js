import React from 'react';
import { socket } from '../../constants/consts';

export default class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vouted: this.props.user.answers[0] ? true : false,
            vout: this.props.user.answers[0] ? this.props.user.answers[0] : null,
            activeQuestion: 1
        }

        let userEmail = this.props.user.email;
        let addToAnswers = this.props.addToAnswers
        let self = this;
        function checkUser(data) {
            if (self.state.vouted === true) return;
            if (userEmail === data.email) {
                self.setState({ vouted: true, vout: data.number });
                addToAnswers(data.name, data.number)
            }
            if (data.number === 0) self.setState({ vouted: false });
        }

        socket.on('clearCards', () => {
            this.setState({ vout: 0 });
            this.setState({ vouted: false });
        })

        socket.on('renderNumber', (data) => checkUser(data));

        socket.on('renderQuestion', (index) => {
            this.setState({ activeQuestion: index.index });
            this.setState({ vout: this.props.user.answers[this.state.activeQuestion - 1] });
            if (this.props.user.answers[this.state.activeQuestion - 1]) {
                this.setState({ vouted: true });
            } else {
                this.setState({ vouted: false });
            }
        })
    }

    render() {
        console.log();
        return (
            <div className="cards__item">
                <div className={`cards__state ${+this.props.answers[+this.props.currentQuestion] > 0 ? "cards__state--flipped" : this.state.vouted ? "cards__state--voted" : "cards__state--unvoted"}`}>
                        {+this.props.answers[+this.props.currentQuestion] > 0 ? this.state.vout : null}
                </div>
                <p className="cards__name">{this.props.user.name}</p>
            </div>
        )
    }
}
