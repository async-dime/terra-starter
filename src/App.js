import './App.css';

import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

import Menu from './components/Menu';
import WalletAddress from './components/WalletAddress';

function App() {
  const { status, connect, disconnect, availableConnectTypes } = useWallet();

  const renderConnectButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div className="connect-wallet-div">
          <button
            type="button"
            key={`connect-EXTENSION`}
            onClick={() => connect('EXTENSION')}
            className="cta-button connect-wallet-button"
          >
            Connect Wallet
          </button>
        </div>
      );
    } else if (status === WalletStatus.WALLET_CONNECTED) {
      return (
        <button
          type="button"
          key={`connect-EXTENSION`}
          onClick={() => disconnect()}
          className="cta-button connect-wallet-button"
        >
          Disconnect Wallet
        </button>
      );
    }
  };

  console.log('Wallet status:', status);
  console.log('Available connection types:', availableConnectTypes);

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>🗡️ Zoro's Terra Dojo 🗡️</h1>
          <p>Help Zoro to train his sword skill in this Terra Dojo</p>
        </div>
        <WalletAddress />
      </header>

      {status === WalletStatus.WALLET_NOT_CONNECTED ? (
        <div className="game-menu-container">
          <img
            src="https://i.giphy.com/media/QQUEsHquYDjEY/giphy.webp"
            alt="Samurai gif"
          />
        </div>
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <div className="game-menu-container">
          <Menu />
        </div>
      ) : null}

      {renderConnectButton()}
    </main>
  );
}

export default App;
