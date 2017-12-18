import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');
// const socket = openSocket(window.location.hostname);
const link = 'http://localhost:3000';
// const link = 'https://bootcamp3-poker.herokuapp.com';

export {socket, link}