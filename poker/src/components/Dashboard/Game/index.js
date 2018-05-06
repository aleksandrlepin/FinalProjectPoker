import React from 'react';

const Game = ({id, nameGame, gameLink, description, onClick}) => (
  <div className="result__game-container">
    <button className="result__game-remove" onClick={((e) => onClick(e, id))}>&times;</button>
    <p className="result__game-name">[ {nameGame} _]</p>
    <a className="result__link" href={gameLink}>{gameLink}</a>
    <p className="result__text">{description}</p>
    <table className="result__table">
      <tbody>
        <tr>
          <th className="result__table-title result__table_border">Stories</th>
          <th className="result__table-title result__table_border">Total effort points</th>
          <th className="result__table-title">Created</th>
        </tr>
        <tr>
          <td className="result__table-data result__table_border">3</td>
          <td className="result__table-data result__table_border">13</td>
          <td className="result__table-data">a day ago</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Game;
