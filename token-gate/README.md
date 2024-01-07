#  🍱 NFT Tickets

> NFT's are most widely associated with art pieces and nothing deeper to it. In reality, NFTs are a take on crucial idea of digitizing or tokenizing the assets. One of the use-cases uncovering the potential of NFT implementations is ticketing/token-gating. We'll create a very basic implementation of a ticketing system and show you how it works.

## 🌌 Quick setup

### 📌 Skip cloning the repo if you have already done so

```
git clone https://github.com/chain4travel/camino-builder.git

cd camino-builder
cd token-gate
npm i
```
> Create a .env file in `token-gate/`

[Setting Up Your .env File](../setup/README.md#setting-up-env-file)

## 💿 Build

### 1️⃣ Step 1
> In `token-gate/contracts` you'll see 2 files: `TicketNFT.sol` and `TicketBooth`. Go to NFT and set the Name and Symbol of the ticket/event.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2015.12.jpeg)

> Deploy the contracts

```
npx hardhat run scripts/deploy.ts --network columbus
```

> If deployment was successful you will see the addresses of 2 contracts in the terminal.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2021.08.2023%20at%2006.51.jpeg)

### 2️⃣ Step 2

> Now that contract is deployed, let's try to enter the event by using enter() function in the ticket booth. You can find a script going through this process in `scripts/enter.ts`. At line 9 replace contractAddr with the address of your deployed TicketBooth.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2002.29.jpeg)

> Run this enter script

```
npx hardhat run scripts/enter.ts --network columbus
```

> Something is wrong, it won't run. Indeed, that is because we don't have a ticket yet. Go to scripts/mint.ts, replace "address" with the address of the nft you have just deployed, and "youraddress" with you c-chain address. Run the script minting the nft.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2015.14.jpeg)

```
npx hardhat run scripts/mint.ts --network columbus
```

> Run enter script again

```
npx hardhat run scripts/enter.ts --network columbus
```

🎊 The message in the terminal says you've successfully used your ticket. Congratulations, you have completed this challenge!

### 3️⃣ Step 3

> A word about how pictures and metadata in nfts work. All the metadata and jpegs, which you see on different websites work via a pretty straight-forward scheme. On a smart contract level the only info that is stored is a link to some cloud storage, which contains a `.json` file. This file has the name of the nft, metadata associated with this nft, and another link to some storage. If we follow this link we will find some picture, the owner of the contract decided to use. By going to `ipfs/ticket.json`, you'll be able to see a format commonly used for a .json file like this (.json may be different, if it's a different ERC standard, or if the project is using some custom logic).

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2002.42.jpeg)

> So basically, the common approach for the nfts creates a layout as such: The smart contract is responsible for digital ownership, the data associated with the image is stored off-chain, and is simply attached to a particular collectible.

## Explore other challenges
 - 🍇  [Build a staking smart contract](https://github.com/camino-builder/tree/staking)
 - 🥝  [Deploy a token](https://github.com/camino-builder/tree/token)
 - 🍓  [Build a Liquidity Pool](https://github.com/camino-builder/tree/liquidity-pool)

 ## 📟 [Back to Mainpage](https://github.com/chain4travel/camino-builder)

