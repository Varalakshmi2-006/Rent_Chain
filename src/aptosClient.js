import { AptosClient, AptosAccount, FaucetClient } from "@aptos-labs/ts-sdk";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";  // Devnet fullnode URL
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";  // Devnet faucet URL

export const client = new AptosClient(NODE_URL);
export const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

export function createAccount() {
  return new AptosAccount();
}
