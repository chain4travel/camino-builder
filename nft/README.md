#  🌔 Build your first NFT

> Let's get a closer look at how you can build and interact with smart contracts. Let's start by setting up the environment.

## 🌌 Quickstart

```
git clone https://github.com/chain4travel/camino-builder.git

cd camino-builder
cd nft
npm i
```

> Create a .env file in `nft/`

[Setting Up .env File](../setup/README.md#setting-up-env-file)

## 🌳 Build

### 1️⃣ Step 1

> Go to 'contracts' and open 'NFT.sol'. In constructor you can give your NFT collection a pretty name and a symbol (e.g CAM for Camino). It should look something like this

![image](https://github.com/juuroudojo/images/blob/main/Image%2014.08.2023%20at%2003.23.jpeg)

> Time to deploy our collection to Columbus testnet! 

```
npx hardhat run scripts/deploy.ts --network columbus
```

> If the contract had been deployed - you'll see the address of your nft in the terminal, we will need it for the next step.

### 2️⃣ Step 2
> Go to scripts/mint.ts. Change the the address of the deployed contract in line 9. Line 13: You are now calling the function mint on your deployed contract. If you go to `NFT.sol`, you'll see a function mint() there, which asks you for arguments: `address to, uint256 tokenId, string memory tokenURI` 

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2000.27.jpeg)

> Input an id (It can be any number, just needs to be not minted previously) and working link to a storage with a .json file with a link to an image you want to be displayed.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2014.37.jpeg)

> Run the script
```
npx hardhat run scripts/mint.ts --network columbus
```

### 3️⃣ Step 3

> Go to [Camino Wallet](https://suite.camino.network/wallet/home). Log into your wallet, at the upper right switch the network to columbus. Click on Collectibles in the Assets menu.
![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2021.08.2023%20at%2012.38.jpeg)

> Paste the address of the NFT and confirm.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2021.08.2023%20at%2013.43.jpeg)

> Congrats! You can now mint, transfer and share your nfts. Check out other challenges to learn about it.

### 4️⃣ Step 4
> Now, on [Camino Wallet](https://suite.camino.network/wallet/home) you can find your collectibles. This now something you have a digital ownership to. It might not seem like much, but you have just made a big step forward.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2014.34.jpeg) 



## Explore other challenges
 - 🍇  [Build a staking smart contract](https://github.com/chain4travel/camino-builder/tree/c4t/staking)
 - 🥝  [Deploy a token](https://github.com/chain4travel/camino-builder/tree/c4t/token)
 - 🍓  [Create your own staking](https://github.com/chain4travel/camino-builder/tree/c4t/staking)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/с4t/token-gate)

## 📟 [Back to Mainpage](https://github.com/chain4travel/camino-builder)
