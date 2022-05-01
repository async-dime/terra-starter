import React, { useState, useEffect } from 'react';
import * as execute from '../contract/execute';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import LoadingIndicator from '../components/LoadingIndicator';

const Play = () => {
  const connectedWallet = useConnectedWallet();
  const playTime = 10;

  const [time, setTime] = useState(playTime);
  const [gameOver, setGameOver] = useState(false);
  // tracking where the target position is on the screen
  const [targetPosition, setTargetPosition] = useState({
    top: '15%',
    left: '50%',
  });
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (time === 0) {
      setTargetPosition({ display: 'none' });
      alert(
        `Game Over! Your score is ${score}. Please confirm tx to submit your score.`
      );
      submitScore();
    }
  }, [time]);

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === 'testnet') {
      setLoading(true);
      // This will return the tx object on confirmation
      const tx = await execute.setScore(connectedWallet, score);
      console.log(tx);
      // Once the tx is confirmed, we can inform user
      alert(`Your score has been submitted!`);
      setLoading(false);
      window.location.href = '/leaderboard';
    }
  };

  const handleClick = () => {
    let audio = new Audio('/Sword_Slash.mp3');
    audio.volume = 0.2;
    audio.play();

    setScore((score) => score + 1);

    setTargetPosition({
      top: `${Math.floor(Math.random() * 80)}%`,
      left: `${Math.floor(Math.random() * 80)}%`,
    });
  };

  return (
    <div className="score-board-container">
      <div className="play-container">
        <span>Score: {score}</span>
        <span>Slash it!</span>
        <span>Time left: {time}</span>
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="game-container">
          <img
            src={'sake.png'}
            id="target"
            alt="Target"
            style={{ ...targetPosition }}
            onClick={handleClick}
          />
          <img src="Zoro.png" id="zoro-img" alt="Zoro" />
        </div>
      )}

      {/* Button for set score (for testing)
      <button
        className="cta-button connect-wallet-button"
        onClick={() => setScore(score + 1)}
      >
        +1 score
      </button>

      Button to submit score (for testing)
      <button
        className="cta-button connect-wallet-button"
        onClick={submitScore}
      >
        Submit score
      </button> */}
    </div>
  );
};

export default Play;
