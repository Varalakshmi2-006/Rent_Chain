// Header.js
import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function Header() {
  const { connect, disconnect, account, connected } = useWallet();

  return (
    <header style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
      <h1>RentChain</h1>
      {connected ? (
        <div>
          <p>Connected: {account?.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </header>
  );
}
