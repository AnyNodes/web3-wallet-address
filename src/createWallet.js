const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// define the number of wallets to create
const NUMBER_OF_WALLETS = 5; // change it on demand

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

  // save wallet into into the walletsInfo.json file in root dir
  const filePath = path.join(__dirname, '..', 'walletsInfo.json');
  fs.writeFileSync(filePath, JSON.stringify(walletsInfo, null, 2));

  console.log(`${NUMBER_OF_WALLETS} wallets have been created and saved in ${filePath}`);
}

createMultipleWallets().catch(console.error);
