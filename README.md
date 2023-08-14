#  Build your fist NFT

> Let's get a closer look at how you can build and interact with smart contracts. Let's start by setting up the environment.

```
git clone https://github.com/chain4travel/camino-builder.git nft
```
```
cd nft
git checkout nft
npm i
```

> Go to 'contracts' and open 'NFT.sol'. In constructor you can give your NFT collection a pretty name and a symbol (e.g CAM for Camino). It should look something like this:
![image](https://github.com/juuroudojo/images/blob/main/Image%2014.08.2023%20at%2003.23.jpeg)

> Time to deploy our collection to Columbus testnet! 

```
npx hardhat deploy --network columbus
```
