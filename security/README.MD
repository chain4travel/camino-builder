# 💬 Security in Smart Contracts

> Smart Contract development is a very special environement: It is very memory sensitive, your every bug and inefficiency will cost money. Branch is still very new, and even though we've heard of tons of exploits, hacks and different bad actors - new ones keep popping up. Even though Solidity as a language does consider the brittle nature of this development and thus gives us very limited tools to work with - you'll still need to be extra cautios. Below we will discuss some of the main exploit vectors, present you with some examples and preventative techniques, all so that your can build smart contracts, which are secure and reliable.



## 🔓 Reentrancy

### Context

Smart Contracts can be called either by EOA (Externally Owned Accounts) or by another smart contracts. Also Smart Contracts have a way of handling incoming native tokens (ETH for Ethereum, CAM for Camino). A contract can only receive native currency in case it has an explicitly declared function `receive()` or `fallback()`. These functions can also contain code, meaning every time native currency is received by the contract a set of instructions within this function is triggered.

![images](https://github.com/juuroudojo/toolsReal/blob/main/images1/Screenshot%202024-01-10%20at%2020.21.31.png)

This opens up a vector of potential attack. 

### Example:

This one is a bit advanced, and the issue actually lies in Vyper compiler, but it is also a relatively fresh and grand hack of one of the biggest staking protocols. [Read here](https://twitter.com/shoucccc/status/1685688647637725184?s=20)

## 📮 Unchecked CALL Returns

### 1️⃣ Context

There are several built-in function solidity offers to transfer native currency. Common one is transfer(). But there is also call(), which is a low-level call, which allows for more versatility. The one thing about call is that unlike transfer() it doesn't revert when ether is not sent. Instead, it returns a boolean indicating whether the call was successful. This leads to a common mistake - developers forgetting to handle the return value, thus breaking the logic and potentially losing money.

### 2️⃣ Preventative Techniques

The solution is simple: always make sure to check the return value of CALL. See image below.
![image](https://github.com/juuroudojo/toolsReal/blob/main/images1/Screenshot%202024-01-13%20at%2014.06.56.png)

## 🎰 Pseudo-randomness

### 1️⃣ Context 

Smart contracts and blockchain are deterministic. Which means that every transaction or change in state is based on calculable conditions. What follows is that in its structure blockchain offers no source of randomness or entropy. This problem became observant in the early days of Ethereum, when a lot of projects were about gambling. Gambling requires uncertainty, or random, which obviously can't be achieved internally.

### 2️⃣ Mechanics of the exploit

A research covering this topic - [Randomness Exploit](https://blog.positive.com/predicting-random-numbers-in-ethereum-smart-contracts-e5358c6b8620)

### 3️⃣ Preventative Techniques

Source of the randomnes needs to be external. Two main ways of achieving it are:

- Using Oracles

Oracle grants a pipeline to data from real world without sacrificing decentralization. Chainling offers a tool called VRF, which allows you to query random values from outside of the blockchain network, which can then be used inside of your code.

- Using commit/reveal pattern


## 🚩 Unverified Input 

### 1️⃣ Context
> Check out [Transaction structure]() to have a better grasp of how it works.

When a call occurs - parameters are passed and encoded according to the ABI specification. If we have a following function:

`function transfer(address _to, uint256 _amount) public {}`

The encoded call would consists of: 

- Function selector (first 4 bytes)
- Address (32 bytes)
- Amount of tokens, uint256 (32 bytes)

If you encode params that are shorter than the expected length - zeros will be appended to make up for the missing chars. 
For example, the expected length of the address is 40 hex (20 bytes). If you instead encode address that is 38 hex (19 bytes) something interesting will happen.

### 2️⃣ Mechanics

When encoding the input your application didn't check whether the address is of correct length. User requesting a withdrawal input his address and amount of tokens to be withdrawn - 100, but accidentally made the address a byte shorter. As far as the size of the encoded call is fixed the missing byte will be filled with 0, but it will fill it at the very end.

So instead of the intended call:


```
0xdabae...eaddhfge700000000000000
00000000000000000000000000000000056bc75e2d631000
```

The call will be:
```
0xdabae...eaddhfg00000000000000
00000000000000000000000000000000056bc75e2d63100000
```

These 2 zeros at the end of the call will execute a withdrawl of 25600 tokens instead of a 100 to a different address.

## ❌ Denial Of Service

### 1️⃣ Context

Many attacks can be grouped by them having a target of making the contract inoperable. As far as there are many ways you can achieve that we will only mention some of the common patternss that enable such vulnerabilities.

- Looping through dynamic arrays
- Owner Maintenance
- State shift based on external calls

## 🚙 Frontrunning

> !!! This vulnerability is technically irrelevant to Camino Network, but instead serves as a way to better understand EVM.

### 1️⃣ Context

The way most blockchains work is: A validator node pooling transactions and forming them into blocks. Once a miner validates a transaction a transaction will be included in the block. The order of transaction to be executed is usually formed by gasPrice (e.g. The higher the price the more profitable is for miner to include it first). There are ways to see transactions before they are included in the block, which opens up a possibility for attacker. 


While mostly the attackers are just users that increase gas price, miners(validators) can be the attackers themselves. Having elevated access compared to normal users give them additional possibilites for that.


### 2️⃣ Preventative techniques

One of the ways to mitigate the vulnerability - place an upper bound for gasPrice

A more robust method - commit/reveal pattern. In such pattern user first sends a transaction submitting incrypted data (hash). After this transaction is processed he sends another transaction to reveal the data that was sent.

### 3️⃣ Example

Check out a blog post covering a [ERC20 Bancor hack](https://hackernoon.com/front-running-bancor-in-150-lines-of-python-with-ethereum-api-d5e2bfd0d798).


##  🔀 DELEGATECALL (Advanced)

### 1️⃣ Context 

Standard external calls within smart contract are handled by CALL opcode, which makes the function that is called be executed in the same contract this function is declared. 

In the image below you can see the difference between CALL and DELEGATECALL. 

> Imagine we have 2 contracts, referred to as A and B. Both have a variable `Number` declared. In A it is set to 5, in B it's 9. A has a function, which only calls smart contract 2 (basically redirecting the call). If you call the function in contract A in a standard way (CALL), you'll have 9 returned. But if you use DELEGATECALL - 5 will be returned. What DELEGATECALL is doing is not executing the function where it is declared (Contract B), but executing this function in the context of contract A.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2010.01.2024%20at%2019.18.jpeg)

### 2️⃣ Mechanics of the Exploit

This is a very common exploit vector, mostly because of the upgradeable contracts. Best way to understand how this works is to check out a hack that happened way back. You can read about it [here](https://medium.com/chain-cloud-company-blog/parity-multisig-hack-again-b46771eaa838).


## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)