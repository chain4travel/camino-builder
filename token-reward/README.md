# Green Onions

Camino network project to reward users for their contributions to sustainability.

## Prerequisites

- Node.js
- npm (or Yarn)
- Hardhat
- Ethereum-compatible wallet with private key (for deployment to live/test networks)

## Installation

Clone the repository and install the dependencies:

```bash
git clone git@github.com:thanasis2028/camino-builder.git
cd camino-builder
npm install
```

## Configuration

Create a `.env` file in the root directory and add your private key:

```env
PRIVATE_KEY=your_private_key_here
REWARD_CONTRACT_ADDRESS=0x0000000
NETWORK_URL=https://columbus.camino.network/ext/bc/C/rpc
```

**Note**: Replace with appropriate values.

Update `hardhat.config.ts` with the network configuration:

```typescript
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const { PRIVATE_KEY } = process.env;

export default {
  networks: {
    camino: {
      url: 'https://rpc.camino.foundation/',
      accounts: [PRIVATE_KEY],
    },
    // other networks...
  },
  // rest of the config...
};
```

## Compile Contracts

Compile the smart contracts:

```bash
npx hardhat compile
```

## Run Tests

Run the tests using Hardhat's built-in test runner:

```bash
npx hardhat typechain 
npx hardhat test
```

This will execute tests in the `test` directory using the Hardhat Network.

## Deploy Contracts

To deploy contracts to a live network, use the deploy script with the `--network` flag:

```bash
npx hardhat run scripts/deploy.ts --network camino
```

**Note**: Ensure the network is properly configured in `hardhat.config.ts`.

## Security

Do not commit sensitive information such as private keys to version control. Always use environment variables for sensitive data.

---

Make sure to replace `https://github.com/thanasis2028/camino-builder.git` with the actual URL of your repository and adjust any specific instructions as needed for your project setup. This README provides a quick guide for developers to get started with compiling, testing, and deploying your smart contracts.