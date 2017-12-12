import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');
const link = 'http://localhost:3000';

export {socket, link}