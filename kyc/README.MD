#  🌔 KYC-verification

> In order to deploy any contract to either Columbus or Camino network you need to have your wallet verified. But contracts you deploy can be called by anyone. Sometimes, you require some additional security, and it would be useful to restrict the calls to be only executable by KYC-verified wallets. Here's how you can do that.

## 🌌 Quickstart

```
git clone https://github.com/chain4travel/camino-builder.git

cd camino-builder
cd kyc
npm i
```

[Setting Up .env File](../setup/README.md#setting-up-env-file)

## 🌳 Build

### 1️⃣ Step 1

> Go to 'contracts' and open 'KYCTest.sol'. If you look at the code, you'll see a simple contract with one function in it. Inside of the function though we see an interesting line.


![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2015.32.jpeg)

> This is how you restrict the access to be exclusively available to KYC-verified wallets. You need to create an object of a contract of CAMINO_ADMIN. It is deployed to Columbus at address 0x010000000000000000000000000000000000000a (refer to Camino Docs). The call returns one of 2 values:
0 if the address that called enter() is not verified, and 1 if it is.

> In order to call CAMINO_ADMIN contract we need to let our KYCTest contract know how can the function be called. To describe this to our contract we need to write an interface located at `contracts/interfaces/IAdmin.sol`.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2015.40.jpeg)

### 2️⃣ Step 2
> Let's deploy our contract.

```
npx hardhat run scripts/deployKYC.ts --network columbus
```

### 3️⃣ Step 3
> Go to scripts/enter.ts. Replace the address line with the address of your deployed contract

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2015.44.jpeg)

> Run enter.ts script

```
npx hardhat run scripts/enter.ts --network
```

> You were able to successfully enter the contract. But if you are to go and create a new wallet and try and call this contract using it - you'll see an error message.

### 4️⃣ Step 4

> Now, in order to make sure the system works - let's try to call same contract but using a wallet without KYC-verification. You can either create your own new wallet or use a dummy account by this .env "5e938fed465c406a029f9652422c08cff76aca6b10e141421702a60ceca804e9". Replace the private key in .env in your kyc subdirectory with the private key of a new wallet. Run the enter script again

```
npx hardhat run scripts/enter.ts --network columbus
```

> In the terminal you will see an exception, looking something like this. 

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/2023-09-11%2001.44.40.jpg).

> Ironically, the error proves we are doing pretty good. 💝 Congratulations again, we now have an ecosystem which functions exactly how we want it to.





## Explore other challenges
 - 🍇  [Build a staking smart contract](https://github.com/chain4travel/camino-builder/tree/c4t/staking)
 - 🥝  [Deploy a token](https://github.com/chain4travel/camino-builder/tree/c4t/token)
 - 🍓  [Create your own NFT!](https://github.com/chain4travel/camino-builder/tree/c4t/nft)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/token-gate/)

## 📟 [Back to Mainpage](https://github.com/chain4travel/camino-builder)
