import React from 'react';

const Game = ({id, nameGame, gameLink, gameDate, description, onClick}) => (
  <div className="result__game-container">
    <button className="result__game-remove" onClick={((e) => onClick(e, id))}>&times;</button>
    <p className="result__game-name">[ {nameGame} _]</p>
    <a className="result__link" href={gameLink}>{gameLink}</a>
    <p className="result__text">{description}</p>
  </div>
)

export default Game;
