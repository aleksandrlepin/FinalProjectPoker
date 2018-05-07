import React from 'react';
import { socket } from '../../constants/consts';
// import './usersCards.css';
import bgBlue from './images/bg_userCard-blue.png';
import bgWhite from './images/bg_userCard-white.png';
import bgBootcamp from './images/bg_userCard-bootcamp.png';
// import cardImg from "../../img/game/card.jpg";

// let stylesClosed = {
//     backgroundImage: 'none',
//     backgroundColor: 'green',
// }
// let stylesVouted = {
//     backgroundImage: `url(${cardImg})`
// }
// let stylesWrapper = {
//     backgroundColor: '#ff6c00'
// }

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
                    {/* <img className="cards__image" src={cardImg} style={{visibility: 'hidden'}} alt="" /> */}

                    {/* <span> */}
                        {+this.props.answers[+this.props.currentQuestion] > 0 ? this.state.vout : null
                            // : null
                        }
                    {/* </span> */}
                </div>
                <p className="cards__name">{this.props.user.name}</p>
            </div>
            // <div className="wrapper-for-user-card" style={this.state.vouted ? stylesWrapper : null}>
            //     <div className="user-card" style={!this.state.vouted ? stylesClosed : stylesVouted}></div>
            //     <div className="user-vout">
            //         {+this.props.answers[+this.props.currentQuestion] > 0 ?
            //             this.state.vout ? this.state.vout : null
            //             : null}
            //     </div>
            //     <p className="user-card-name">{this.props.user.name}</p>
            // </div>
        )
    }
}
