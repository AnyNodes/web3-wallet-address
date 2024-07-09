const fs = require('fs');
const path = require('path');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { mnemonicGenerate } = require('@polkadot/util-crypto'); // Import function for generating mnemonics

// Define RPC URL
const RPC_URL = 'wss://testnet-rpc0.cess.cloud/ws/';
const NUM_WALLETS = process.argv[2] || 4; // Number of wallets to generate, default is 4

async function generateWallets(count) {
  const provider = new WsProvider(RPC_URL);
  const api = await ApiPromise.create({ provider });
  const keyring = new Keyring({ type: 'sr25519', ss58Format: api.registry.chainSS58 });
  let walletData = [];

  for (let i = 0; i < count; i++) {
    const mnemonic = mnemonicGenerate(); // Generate mnemonic
    const wallet = keyring.addFromMnemonic(mnemonic); // Create wallet using mnemonic
    walletData.push({
      address: wallet.address,
      mnemonic: mnemonic // Store mnemonic
    });
    // console.log(`Address ${i}: ${wallet.address}, Mnemonic: ${mnemonic}`);
  }

  // Prepare filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filenameTimestamped = `dotWalletsInfo-${timestamp}.json`;
  const filenameDefault = 'dotWalletsInfo.json'; // Default filename

  const filePathTimestamped = path.join(__dirname, '../walletsInfo/', filenameTimestamped);
  const filePathDefault = path.join(__dirname, '..', filenameDefault);

  // Save wallet data to a JSON file with timestamp
  fs.writeFileSync(filePathTimestamped, JSON.stringify(walletData, null, 2));
  console.log(`Wallet data saved to ${filenameTimestamped}`);

  // Save the same wallet data to a default JSON file
  fs.writeFileSync(filePathDefault, JSON.stringify(walletData, null, 2));
  console.log(`Wallet data also saved to ${filenameDefault}`);

  // Disconnect from WebSocket
  await api.disconnect();
}

generateWallets(NUM_WALLETS);  // Generate the specified number of wallets
