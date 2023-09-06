# 💎 Exploit Pseudo-Randomness

## 🏁 [Prepare the environment](https://github.com/chain4travel/camino-builder/setup)


### 🌌 Setup

> Clone the repo 

```
git clone https://github.com/chain4travel/camino-builder.git
cd camino-builder
cd challenges
cd random
```

### Intro

> 🔧 It is important to understand the vulnerabilities Smart Contracts have to build a safe and reliable platform. By looking at patterns that can introduce these security breaches developer can understand what to keep in mind when building an ecosystem. Today we will play a role of bad actor. In `contracts/` you'll find a contract Target. This is the contract we will be trying to hack. It is a game that offers participants to call a function tryYourLuck() for a chance to win a prize pool. User can call the function as many times as he wants, but for each call he pays a fixed intro fee. 

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2001.09.2023%20at%2015.59.jpeg)

### 📤 What's that about?

> Smart contracts are deterministic, which makes it tough when we need something to be unpredictable or hidden. In this contract we have a secret number, and a function `entry()` which user has to call to play the game. If a pseudo-random value, which is based on the block.timestamp of the call matches `secretNumber` user takes the prize pool.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2007.09.2023%20at%2000.40.jpeg)

## 🔋 How to play

In the `contracts/` you have a contract of Attacker. We encourage you to try and write the contract on your own. Inside the file you can find some inline documentation which should guide you to the direction of the solution. Even if you don't manage to crack this one, don't worry - it will help you understand the code structure.



## 🎑 [Back to Mainpage](https://github.com/chain4travel/camino-builder)