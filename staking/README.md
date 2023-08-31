# Build a full-fledged Staking Platform

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

> 🔧 Let's try something different this time. This example puts you in a real development environtment. Your main focus here is the code itself. Look for staking contract in /contracts. You are encouraged to inspect it and modify it. The contract is built in a way that captures the idea of what the platform should work like, but has some inconstitencies. You'll need to play around with it. Some things need need to be changed, some added, some gotten rid of. You are an artist and this is your canvas. Feel free to break everything and build again, cause the best way to learn.
You can find a detailed inline documentation describing each component of the contract, this should help you figure all of it out.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2031.08.2023%20at%2023.22.jpeg)

> After you are done inspecting the code - try putting your skills to test. Deploy your contract to the test network.

```
npx hardhat compile
npx hardhat run scripts/deploy.ts --network columbus
```

## Step 2

> Now that you have implemented your custom logic - write your own script using `scripts/sample.ts` as a guide. If your setup is correct - you should be able to check if your platform works as intended.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2031.08.2023%20at%2023.41.jpeg)




## Explore other challenges
 - 🍇  [Build a KYC-compliant contract](https://github.com/chain4travel/camino-builder/tree/c4t/kyc)
 - 🥝  [Deploy a token](https://github.com/chain4travel/camino-builder/tree/c4t/token)
 - 🍓  [Create your own NFT!](https://github.com/chain4travel/camino-builder/tree/c4t/nft)
 - 🍍  [Set up you own Ticketing System](https://github.com/chain4travel/camino-builder/tree/token-gate/)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)