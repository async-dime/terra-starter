import React from 'react';
import { Link } from 'react-router-dom';

import WalletAddress from '../components/WalletAddress';

function Guide() {
  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>🗡️ Zoro's Terra Dojo 🗡️</h1>
            <p>Help Zoro to train his sword skill in this Terra Dojo</p>
          </div>
        </Link>
        <WalletAddress />
      </header>

      <div className="score-board-container">
        <h3>How to play</h3>
        <div>
          <span className="help">
            Click the sake bottle as fast as you can on the screen during time
            limit to earn points
          </span>
        </div>
      </div>
    </main>
  );
}

export default Guide;
