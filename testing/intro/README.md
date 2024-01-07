# 🎳 Introduction to Tests


### 🌌 Setup

> Clone the repo and install dependencies

```
git clone https://github.com/chain4travel/camino-builder.git

cd testing
cd intro
npm i
```

> Create a .env file in `testing/intro`

[Setting Up .env File](../setup/README.md#setting-up-env-file)

## 1️⃣ Step 1

> 🔧 In `contracts/` we have a `Storage.sol`. A basic smart contract, which allows you to store and retrieve some data. This contract will help us make our first steps into the world of testing.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2004.09.2023%20at%2016.37.jpeg)

> Test files are located at `test/test.ts`. Let's inspect our `test.ts`. We have some useful testing tools at the top. You can learn more about them in Educational Materials. 

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2004.09.2023%20at%2016.41.jpeg)

## 2️⃣ Step 2
> Let's first try to run the tests. Compile our contracts and run tests scripts

```
npx hardhat compile
npx hardhat test
```

> You'll see an output looking something like this

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2004.09.2023%20at%2016.58.jpeg)

> The basic structure comes down to set up done in `before()` and `beforeEach()`, and test cases with keywords `it()`. `before()` and `beforeEach()` pattern allows us to have isolated test cases. Basically, before each `it()` test clause, we redeploy our contract, so that the actions in the previous test case don't influence the state of the current one. In order to prove it, let's look at our test cases. In the first test case called `"should allow to store numbers"` we call `get()` before and after storing a new value there. We can see that at the end of the test case, the value is set to `42`. But when we call `get()` again in the next test case (`"should allow other users to store numbers"`) - we see that it is set to 0, which is the value that we had before the actions that happened in first test case.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2004.09.2023%20at%2016.51.jpeg)


## Keep Learning about Tests
- [Testing Structure](https://github.com/chain4travel/camino-builder/tree/c4t/testing/structure)


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)