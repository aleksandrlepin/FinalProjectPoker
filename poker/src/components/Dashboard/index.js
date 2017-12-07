import React from 'react';
// import UserCards from '../usersCards/index';

export default class Dashboard extends React.Component {

    handleSave = () => {
        let newGame = JSON.stringify({name: this.refs.gameName.value,
        owner: 'Sasha',
        questions: { "1": "Some quesstion#1",
        "2": "Some quesstion#2",
        "3": "Some quesstion#3",
        "4": "Some quesstion#4",
        "5": "Some quesstion#5"},
        answers: {"1": "55",
        "2": "33",
        "3": "65",
        "4": "77",
        "5": "21"},
        currentQuestion: '2',
        users: [ {
            "name": "Dmitryi Yrich",
            "email": "vasia@vasia.de",
            "answers": {
                "q1": "77",
                "q2": "54",
                "q3": "11",
                "q4": "5",
                "q5": "8"
            }
        },
        {
            "name": "Vasiliy Kasiliy",
            "email": "kasiliy@vasiliy.de",
            "answers": {
                "q1": "2",
                "q2": "5",
                "q3": "8",
                "q4": "13",
                "q5": "21"
            }}]});
        console.log(newGame);    

        fetch('/saveGame', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newGame
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } 

    render() {
        return (
            <div>
              {/* <UserCards /> */}
              <h1>hello</h1>
              <input ref='gameName' placeholder='game name'></input>
              <button onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}