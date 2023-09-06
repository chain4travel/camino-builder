# 💎 Deploy your own token on Columbus network

## 🏁 [Prepare the environment](https://github.com/chain4travel/camino-builder/setup)


### Step 1

> Clone the repo 

```
git clone https://github.com/chain4travel/camino-builder.git
cd camino-builder
cd token
npm i
```

> 🔧 In `contracts/` you will find a file `Token.sol`. Give your token a fancy name and symbol. You can also modify the initial supply that is going to be minted

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.03.jpeg)

> Compile and Deploy the contract.

```
npx hardhat compile
npx hardhat run scripts/deploy.ts --network columbus
```

> 📎 After the contract is successfully deployed you'll see the address of your token in the terminal. Copy this addres to clipboard.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.16.jpeg)

## Step 2

> Go to [Camino Wallet](https://suite.camino.network/wallet). At the upper right switch the network to Columbus. Open homepage and click on Add Token. Paste the address from your terminal. If everything is correct you will see a popup window previewing name, symbol and decimals of your token (18 if you haven't modified the code).

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.21.jpeg)

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.29.jpeg)

> ♥️ Congrats! Your token is live. You should now be able to see your balance of your new token in the Assets menu.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.34.jpeg)


## Explore other challenges
 - 🍇  [Build a Staking Platform](https://github.com/chain4travel/camino-builder/tree/c4t/staking)
 - 🥝  [Deploy a KYC-compliant Smart-contract](https://github.com/chain4travel/camino-builder/tree/c4t/kyc)
 - 🍓  [Create your own NFT!](https://github.com/chain4travel/camino-builder/tree/c4t/nft)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/token-gate/)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)