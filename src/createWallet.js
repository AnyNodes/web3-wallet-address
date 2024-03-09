const { ethers } = require('ethers');
const fs = require('fs');

// create new wallet
async function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  const { address, privateKey } = wallet;

  // optional: create object that contains wallet info
  const walletInfo = {
    address,
    privateKey,
    mnemonic: wallet.mnemonic.phrase
  };

  // save wallet info to local file
  const filePath = path.join(__dirname, '..', 'walletInfo.json');
  
  fs.writeFileSync(filePath, JSON.stringify(walletInfo, null, 2));

  console.log('Wallet is created and saved in walletInfo.json');
}

createWallet().catch(console.error);
