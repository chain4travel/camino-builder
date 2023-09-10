# 💎 Deploy your own token on Columbus network


## 🌌 Quickstart

> Clone the repo 

```
git clone https://github.com/chain4travel/camino-builder.git

cd camino-builder
cd token
npm i
```

> Create a .env file in token/

[Setting Up Your .env File](../setup/README.md#setting-up-env-file)

## 🌳 Build

### 1️⃣ Step 1

> 🔧 In `contracts/` you will find a file `Token.sol`. Give your token a fancy name and symbol. 

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.03.jpeg)

> By going to `scripts/deploy.ts`, and inspecting the file by follow the inline documentation - you will see, that in line 9 we deploy the token, inputting an argument of initial supply. This amount is going to be minted to the address you are using for deployment. Feel free to change this number to whatever amount you feel is right.

> Compile and Deploy the contract. 

```
npx hardhat run scripts/deploy.ts --network columbus
```

> 📎 After the contract is successfully deployed you'll see the address of your token in the terminal. Copy this addres to clipboard.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.16.jpeg)

### 2️⃣ Step 2

> Go to [Camino Wallet](https://suite.camino.network/wallet). At the upper right switch the network to Columbus. Open homepage and click on Add Token. Paste the address from your terminal. If everything is correct you will see a popup window previewing name, symbol and decimals of your token (18 if you haven't modified the code).

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.21.jpeg)

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.29.jpeg)

> ♥️ Congrats! Your token is live. You should now be able to see your balance of your new token in the Assets menu. 

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.34.jpeg)

### Step 3

> Right now our balance is the initial supply, we chose when deploying the token. But what if we want to have some more? We have a `mint.ts` in `scripts/` for that. In line 12 change the first argument to your address, and 2nd argument to the amount you want minted. If you want to learn more about how it works - follow the inline documentation. Run the mint script

```
npx hardhat run scripts/mint.ts --network columbus
```

> Go to [Camino Wallet](https://suite.camino.network/wallet) again. After logging in and switching the network to columbus - you'll see that your balance is now equal to the initial supply plus the amount you just minted. This can only mean one thing - your code works as intended, congrats!

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2002.23.jpeg)


## Explore other challenges
 - 🍇  [Build a Staking Platform](https://github.com/chain4travel/camino-builder/tree/c4t/staking)
 - 🥝  [Deploy a KYC-compliant Smart-contract](https://github.com/chain4travel/camino-builder/tree/c4t/kyc)
 - 🍓  [Create your own NFT!](https://github.com/chain4travel/camino-builder/tree/c4t/nft)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/token-gate/)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)