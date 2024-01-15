#  🌟 Front-End Integration

> In here you'll find a rough example showing how smart contracts coexist with frontend. This is not a front-end development tutorial, thus we will only emphasize points of integration.

## 🌌 Quick setup
```
git clone https://github.com/chain4travel/camino-builder.git

- cd camino-builder
- cd front-end
- [Tailwind](https://tailwindcss.com/docs/installation)
```

[Setting Up Your .env File](../setup/README.md#setting-up-env-file)

## IntrO
> Here you'll find several chapters on how you integrate your smart contract with front-end and have so that you are one step closer to a complete dApp. We will use React.js and Hardhat.

## Step 1

We will start by writing a very simple smart contract that will let us do one thing: transfer CAM tokens to other addresses through our dApp. You can find the contract in `front-end/smart-contracts/contracts`. The contract goes as following:

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.11.2023%20at%2018.05.jpeg)

## Step 2

Run 

```
npm i
npm run dev
```

If you now cmd(ctrl)+click on localhost link - you'll open the app in your browser. The code for the app is located in `/vite-project` and smart contract code is a hardhat project in `/smart-contracts`.

# :octocat: DEVELOP

If you are not acquianted with front-end development you might feel lost, but don't you worry. We only need to pay attention to specific points, which can then be simplified to only do their job. 

Let's walk through some of the main conecepts of smart contract integration in our dApp:


## 💡 Connecting Users Wallet

All interactions within our dApp need to originate somewhere. Identity in smart contracts is represented by an account, which in its essence comes down to a private key. We, as developers, work with private keys directly, but it woudn't be an optimal experience for our users. That's what wallets are for. Technically wallets are just software that hold private keys and handle all interactions and integrations. Luckily for us, this software offers tools to seemlessly integrate blockchain part into our dApp.

What we want to do first is have user 'log in' to our website, so that he can then do big things. 

This functions is where everything happens

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2007.01.2024%20at%2019.18.jpeg)

In line 95 we first check whether some wallet software is available. If that's the case, we then call `eth_requestAccounts`, which returns an array of accounts. We then grab the first one and set it as the current one.

## 📝 Creating the object of a smart contract

First thing to do when we want to interact with a contract is to a create an object of it. There are different methods, suitable for different cases, but in our scenario you will need:

- Address of the deployed contract
- ABI of the contract
- Instance of an account calling the contract

ABI(Application Binary Interface) is how everything interact with Smart Contracts from the outside. Whenever a call on any platform occurs, or one contract calls another - ABI is used to know what and how can be called. ABI in its essense is a .json file with a single object inside of it.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2007.01.2024%20at%2023.58.jpeg)

In order to retrieve ABI of your contract you'll have to:

1. Compile your smart contract by running 
```
npx hardhat compile
```
2. Go to `smart-contracts/artifacts/contracts`. Open the `<NameOfYourContract>.json` (not .dbg.json)

3. What you are seeing is the ABI. Copy everything that is inside this file. Now go to your react project and create a .json file containing this ABI in some place you see fit. We used `vite-project/src/utils/`. SendCAM.json is where we are going to access our ABI from.

After we have the object of the contract our path is clear and the process is pretty trivial. All you have to do is just call the function you need like this:

```
await contract.function()
```

## 🎼 Using Data from Smart Contracts

All the main things happen in `SenderContext.jsx`. It makes more sense to check it out to grasp the full context, but we will still have a rough walk-through. First of all, all the functions in here are passed through the context the following way:

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2008.01.2024%20at%2000.17.jpeg)

Our dApp has a list of latest transactions it has processed. So how do we do it? After creating the object of the contract we now want to use the data it stores. We do it in this function:

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2008.01.2024%20at%2000.20.jpeg)

By calling `getAllTransactions()` function we retrieve a struct, which we then structure to match the expected format. Afterwards, we add our transaction to the list and it gets passed to a context. For more info on how we use it - check out `vite-project/src/components/Transactions.jsx`





## 📟 [Back to Mainpage](https://github.com/chain4travel/camino-builder)


