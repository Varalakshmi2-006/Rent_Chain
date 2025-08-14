import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  WalletProvider,
  PetraWallet,
  MartianWallet,
} from '@aptos-labs/wallet-adapter-react';

const wallets = [new PetraWallet(), new MartianWallet()];

ReactDOM.render(
  <WalletProvider wallets={wallets} autoConnect={false}>
    <App />
  </WalletProvider>,
  document.getElementById('root')
);
