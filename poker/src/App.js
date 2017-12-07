import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UserCards from './components/usersCards/index';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/index';
import GameField from './components/GameField/index';
import Card from './components/usersCards/UserCard';

const socket = openSocket('http://localhost:3001');


class App extends Component {

  // getInfoFromServer = () => {

  //   let id = JSON.stringify({ number: 100 });
  //   fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: id })
  //     .then(res => res.json())
  //     .then(res => {

  //       console.log("res", res)
  //     })
  //     .catch(res => console.log('error'));

  // }


  render() {

    return (

      <MainLayout> 
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/play/game/:id' component={GameField} />
          <Route path='/card' component={Card} />
        </Switch>
      </MainLayout>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to aaaaaaaaaaa</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <button onClick={this.getInfoFromServer}>button</button>
      //   <UserCards />
      // </div>
    );
  }
}

export default App;
