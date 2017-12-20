// import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/index';
import GameField from './components/GameField/index';
import NewGame from './components/Dashboard/NewGame/index';
import Card from './components/usersCards/UserCard';
import MainPage from './components/MainPage';
import Registration from './components/Registration';
import Login from './components/Login';
import LoginOwnGame from './components/LoginOwnGame';
import About from "./components/About/About";
import Contacts from "./components/Contacts/Contacts";

class App extends Component {

  render() {

    return (
      <MainLayout> 
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/loginOwnGame' component={LoginOwnGame} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/newgame' component={NewGame} />
          <Route path='/play/game/:id' component={GameField} />
          <Route path='/card' component={Card} />
          <Route path='/about' component={About} />
          <Route path='/contacts' component={Contacts} />
        </Switch>
      </MainLayout>
    );
  }
}

export default App;
