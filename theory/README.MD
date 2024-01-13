

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

### Transaction Flow



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

Concepts

Contract ABI


Vocabulary

Standards

