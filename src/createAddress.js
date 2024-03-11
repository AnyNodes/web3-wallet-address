const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Define the number of wallets to create
const NUMBER_OF_WALLETS = 5; // Change it on demand

async function createMultipleWallets() {
  let walletsInfo = [];

  for (let i = 0; i < NUMBER_OF_WALLETS; i++) {
    const wallet = ethers.Wallet.createRandom();
    const walletInfo = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
    walletsInfo.push(walletInfo);
  }

  // Generate a timestamp for the filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `walletsInfo-${timestamp}.json`;

  // Save wallet info into the file with timestamp in filename
  const filePath = path.join(__dirname, '..', filename);
  fs.writeFileSync(filePath, JSON.stringify(walletsInfo, null, 2));

  console.log(`${NUMBER_OF_WALLETS} wallets have been created and saved in ${filePath}`);
}

createMultipleWallets().catch(console.error);
