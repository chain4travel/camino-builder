# Introduction to Tests

## 🏁 [Prepare the environment](https://github.com/chain4travel/camino-builder/setup)


> Let's talk more about the structure of the testing. This is a lesson 2, it is recommended you first go through [Intro](https://github.com/chain4travel/camino-builder/tree/c4t/testing/intro).

## Step 1

```
git clone https://github.com/chain4travel/camino-builder.git
cd testing
cd structure
npm i
```

> We will now take a look at a test file with some additional functionality. In here we have a contract of exchange, which will allow you to swap your TokenA for TokenB. We mint the initial supply of TokenA to deployer, but delegate the minting of the TokenB to exchange. So the way to get TokenB is by giving away an equivalent amount of TokenA

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2006.09.2023%20at%2023.45.jpeg)

> Test files are located at `test/test.ts`. Let's inspect our `test.ts`. First thing we see, is that we now have multiple contracts deployed in beforeEach(), and we also make sure the sequence is right. We need to have the right order of deployment, because one of contracts constructor asks for the address of another token, this is a part of designing your ecosystem.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2006.09.2023%20at%2023.48.jpeg)

## Step 2
> Let's first try to run the tests. Compile our contracts and run tests scripts

```
npx hardhat compile
npx hardhat test
```

> You'll see an output looking something like this

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2006.09.2023%20at%2023.50.jpeg)

> The new thing we can meet in our test cases is expect(contract.call(()).).to.be.revertedWith. If you refer to the educational material - you will find some info in ethers.js, mocha and chai docs explaining all the tools you can use for testing. You can expect the call to be reverted like in this example, check the events emitted by the contract and many more.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2006.09.2023%20at%2023.53.jpeg)


## Keep Learning about Tests
- [Testing Structure](https://github.com/chain4travel/camino-builder/tree/c4t/testing/structure)
- [Forking a Network](https://github.com/chain4travel/camino-builder/tree/c4t/testing/fork)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)