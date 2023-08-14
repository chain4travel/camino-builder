#  Build your first NFT

> Let's get a closer look at how you can build and interact with smart contracts. Let's start by setting up the environment.

```
git clone https://github.com/chain4travel/camino-builder.git nft

cd nft
git checkout nft
npm i
```

> Go to 'contracts' and open 'NFT.sol'. In constructor you can give your NFT collection a pretty name and a symbol (e.g CAM for Camino). It should look something like this

![image](https://github.com/juuroudojo/images/blob/main/Image%2014.08.2023%20at%2003.23.jpeg)

> Time to deploy our collection to Columbus testnet! 

```
npx hardhat deploy --network columbus
```

> And that's it! You have now deployed an NFT to a columbus network.

## Explore other challenges
 - 🍇  [Build a staking smart contract](https://github.com/camino-builder/tree/staking)
 - 🥝  [Deploy a token](https://github.com/camino-builder/tree/token)
 - 🍓  [Build a Liquidity Pool](https://github.com/camino-builder/tree/liquidity-pool)


