const fs = require('fs');
const bip39 = require('bip39');
const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');
const path = require('path');

// Function to generate a new Solana keypair from a mnemonic
function generateSolanaKeypairFromMnemonic(mnemonic, index = 0) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const derivedSeed = derivePath(`m/44'/501'/${index}'/0'`, seed.toString('hex')).key;
  return Keypair.fromSeed(derivedSeed.slice(0, 32));
}

// Generate and save wallets
function generateAndSaveWallets(numWallets) {
  const wallets = [];
  const mnemonic = bip39.generateMnemonic(); // Generates a new mnemonic

  for (let i = 0; i < numWallets; i++) {
    const wallet = generateSolanaKeypairFromMnemonic(mnemonic, i);
    const publicKey = wallet.publicKey.toString();
    const secretKey = Array.from(wallet.secretKey);
    
    wallets.push({
      mnemonic,
      index: i,
      publicKey,
      secretKey
    });
  }

  // Prepare filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `solWalletsInfo-${timestamp}.json`;

  // Save wallets to a JSON file
  fs.writeFileSync(path.join(__dirname, '..', filename), JSON.stringify(wallets, null, 2));
  console.log(`Wallets saved to ${filename}`);
}

// Generate 5 wallets
generateAndSaveWallets(5);
