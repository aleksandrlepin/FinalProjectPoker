import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/index';
import GameField from './components/GameField/index';
import Card from './components/usersCards/UserCard';

const socket = openSocket('http://localhost:3001');


class App extends Component {

  render() {

    return (
      <MainLayout> 
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/play/game/:id' component={GameField} />
          <Route path='/card' component={Card} />
        </Switch>
      </MainLayout>
    );
  }
}

export default App;
