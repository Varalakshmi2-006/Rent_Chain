import React from 'react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

function WalletConnectInner() {
  const { connect, disconnect, account, connected } = useWallet();

  return (
    <div style={{ margin: '1rem 0' }}>
      {!connected ? (
        <button onClick={() => connect('Petra')}>Connect Petra</button>
      ) : (
        <>
          <p>Connected: {account?.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
}

export default function WalletConnect() {
  return (
    <AptosWalletAdapterProvider plugins={[new PetraWallet()]} autoConnect>
      <WalletConnectInner />
    </AptosWalletAdapterProvider>
  );
}
