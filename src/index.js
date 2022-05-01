import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css';

import Play from './pages/play';
import Guide from './pages/guide';
import Leaderboard from './pages/leaderboard';

import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';

const TWITTER_HANDLE = '_buildspace';
const TWITTER_HANDLE2 = 'async_dime';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <React.StrictMode>
      <WalletProvider {...chainOptions}>
        <div className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/play" element={<Play />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/guide" element={<Guide />} />
            </Routes>
          </BrowserRouter>
          <div className="footer-container">
            <img
              alt="Twitter Logo"
              className="twitter-logo"
              src="/twitter-logo.svg"
            />
            <p className="footer-text">Made with</p>
            <div>&nbsp;</div>
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${TWITTER_HANDLE}`}</a>
            <div>&nbsp;</div>
            <div>x</div>
            <div>&nbsp;</div>
            <a
              className="footer-text"
              href={TWITTER_LINK2}
              target="_blank"
              rel="noreferrer"
            >{`@${TWITTER_HANDLE2}`}</a>
          </div>
        </div>
      </WalletProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
