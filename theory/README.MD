## 🔋 Developer Bootstrap

Smart Contracts have a lot of confusing concepts and names, but most of them are friendly if you just get down to it. Solidity is a more minimalistic programming language compared to other languages, so it should be pretty easy for an experienced developer to get into it fast. With this idea in mind, in this section you'll find some terms and concepts with comparisons to standard programming (mostly OOP) to help you get on track faster.

> For convenience, we will refer to standard programming as OO and to smart contract programming as SC

### 📑 Smart Contract = Class && Deployed - Object

Smart Contract fits pretty good into the description of a class in OO. It is a blueprint with functions and variables that is going to be implemented when deployed. Following this logic you could perceive deployed smart contract as an object. Even the syntaxis is pretty much the same: `<NameOfTheContract>{<BodyOfThEContract>}``. 

So thinking of an NFT Smart Contract collection - you can say that the code itself is a class. It has the logic and functionality layed out, but it is actually just a set of methods without implementation. This smart contract can be deployed multiple times by multiple entities and each will be a separete NFT collection with a unique setup (Thus seen as object).

### 🔎 Mapping = Hashmap, Dictionary

Differences:

- Storage: Solidity mappings are stored on the blockchain and are part of the contract's state. In contrast, OO hashmaps are typically in-memory and not persistent unless serialized or stored in a database.
- Iteration: OO hashmaps/dictionaries allow iteration over their elements, which is not possible with Solidity mappings.
- Flexibility: OO hashmaps can often be more flexible in terms of the types of keys and values they can store, and they allow for dynamic memory management. Solidity mappings are more rigid and are designed with the constraints of blockchain and gas costs in mind.
- Default Values: In Solidity, accessing a non-existent key in a mapping returns a default value. In OO languages, this usually results in an error unless handled explicitly.


## 🔅 What is Different?

### 📮 Events in OO and SC

- OO, events are actions or occurrences recognized by software, often used in event-driven programming.
- Solidity events provide a way for contracts to communicate that something has happened on the blockchain, which can be listened to by external clients.

### :interrobang: Error Handling
- OO: Typically involves try-catch blocks and throwing/catching exceptions.
- Solidity: Uses require, revert, and assert for error handling, which can revert transactions when conditions fail.

## 🔗 Concurrency
- OO: Multithreading and various synchronization mechanisms are available.
- Solidity: No concept of threading. Transactions are processed sequentially, and state changes are atomic.

## ➰ Polymorphism
- OO: Supports both static (compile-time) and dynamic (runtime) polymorphism.
- Solidity: Limited to function overriding (a form of runtime polymorphism), but no support for dynamic polymorphism due to the EVM's constraints.

## 🔳 Encapsulation
- OO: Encapsulation is achieved using access modifiers, hiding the internal state and requiring interaction through methods.
- Solidity: Similar, but state variables can be directly accessed if they are public. Encapsulation is more about protecting invariants and controlling changes.

## 📘 Memory Management
- OO: Automatic memory management, garbage collection (like in Java, Python).
- Solidity: Manual memory management with memory (temporary) and storage (permanent) keywords. No garbage collection.


# 📝 General Concepts

### Transaction Structure

Transaction is a signed binary message that originates by an externally owned account. It is transmitted and recorded by the blockchain network. Transaction is also the only thing that can trigger the state change of the EVM. 

Transaction contains the following data:

1. Nonce
A sequence number used to avoid message replay
2. Gas Price
Price the caller is agreeing to pay for a unit of gas
3. Gas Limit
The maximum amount of gas caller is agreeing to buy (each unit will be purchased for the price stated in GasPrice)
4. Recipient 
Adress the call is intended to
5. Value
Amount of native currency (CAM) attached to a call
6. Data
Binary data payload
7. v,r,s
Components of the digital signature


### Digital Signature

Foundation of the blockchain technology is the cryptography. The decentralized computer only makes sense if it is secure. EVM uses ECDSA (Eliptic Curve Digital Signature Algorithm), which is an asymmetric cryptographic algorithm, which works with public-private key pairs. The core component pushing the idea forward is having a user confirm the ownership without revealing the private information.



### Calls

There are several ways you can call smart contracts. As in a standard computer all the call to EVM are executed with the help of OPCODES. These are low-level calls that lay somewhere between high-level language we developers work with (Solidity) and raw bytecode EVM interprets. OPCODES for calls are:

- CALL - a standard way of calling the contract

- DELEGATECALL - a call that executes the function of the contract that is being called in the context of the proxy contract.

See the image below to understand the difference

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2010.01.2024%20at%2019.18.jpeg)

- STATICCALL - a call that allows us to read data off blockchain.

An example of STATICCALL being the foundation of the technology is [Gelato](https://www.gelato.network/automate). If you are interested in the technology I recommend you give their docs a read. To explain the core of the idea - gelato allows you to automate your contract by calling the view function with a staticcall all the time. If the function returns false - it just keeps calling it periodically. If the function you set up returns true - it executes the code you put there. 

### Gas

EVM is a turing complete computer. Thus it faces a challenge all such systems do - halting problem. There is no way to predict whether a call is going to terminate prior to execuing the call. For blockchain this would be a drastic detriment. In an effort to solve this issue - gas was introduced. Gas is a metric system that calculates the amount of computation and quantifies it in a for of gas. This gives a way to predict the amount of computation as well as introduce limits, like gasLimit, which basically solves the initial problem.

gasPrice - amount that is being paid for a unit of gas (in wei)

gasLimit - max amount of gas that is going to be purchased

### Wallet

Wallet is a software that manages private keys. It is more commonly seen as the users account, and it is indeed the entrypoint from the user side. What happens behind the scenes is wallet handling all the things that you don't want to see yourself. Wallet signs transactions using your private key, offers software for authentication, handles the infrastructure connecting applications to smart contracts.


