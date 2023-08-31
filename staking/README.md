# Build a full-fledged Staking platform

### 🏁 Prepare the environment

```
git clone https://github.com/chain4travel/camino-builder.git staking

cd token-gate
git checkout token-gate
npm i
```

[Set up your .env](setup/README.md#setting-up-env-file)

> For this example you'll need to have a KYC-verified wallet. Refer [here](https://docs.camino.network/guides/kyc/index.html) to find out how to do it

## Step 1

> 🔧 Look for staking contract in /contracts. You are encouraged to inspect it and modify it. Breaking everything will only make you better eventually.

> Compile and Deploy the contracts.

```
npx hardhat compile
npx hardhat run scripts/deploy.ts --network columbus
```

> 📎 After the contract is successfully deployed you'll see the address of your token in the terminal. Copy this addres to clipboard.


## Step 2

> Try interacting with the staking through a script. Modify the numbers and conditions in scripts/stake.ts

```
npx hardhat run scripts/stake.ts
```

## Step 3

> Now try calling the same script, but using a wallet without KYC-verification. You can use any wallet, just make sure it has some CAM in it. The platform will revert the call and inform the user that he needs to be KYC-verified.


## Explore other challenges
 - 🍇  [Build a KYC-compliant contract](https://github.com/chain4travel/camino-builder/tree/c4t/kyc)
 - 🥝  [Deploy a token](https://github.com/chain4travel/camino-builder/tree/c4t/token)
 - 🍓  [Create your own NFT!](https://github.com/chain4travel/camino-builder/tree/c4t/nft)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/token-gate/)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)