import { Link } from 'react-router-dom';
import * as query from '../contract/query';
import { useEffect, useState } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider';

import WalletAddress from '../components/WalletAddress';

const Leaderboard = () => {
  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    setLoading(true);
    const fetchScores = async () => {
      if (connectedWallet && connectedWallet.network.name === 'testnet') {
        console.log('Scores fetched');
        return (await query.getScores(connectedWallet)).scores;
      }
    };
    fetchScores().then((scores) => {
      setScores(scores);
      setLoading(false);
    });
  }, [connectedWallet]);

  const renderScores = (scores) => {
    if (!scores || scores.length < 1) {
      return <div>No scores yet</div>;
    }

    return scores.map((score, index) => {
      return (
        <div key={index} className="score">
          {/* Format is address: score */}
          {/* Slice address to first 5 chars, and last 4 chars */}
          <span>
            {score[0].slice(0, 5) + '...' + score[0].slice(-4)}:{' '}
            {score[1].toString().padStart(2, '0')}
          </span>
        </div>
      );
    });
  };

  return (
    <main>
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
        <h3>Leaderboard</h3>

        {loading ? <div>Loading...</div> : renderScores(scores)}
      </div>
    </main>
  );
};

export default Leaderboard;
