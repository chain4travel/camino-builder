# 🔬 Setup


## 🛅 Setting Up .env File

> In the subdire you are working with create a file with a name .env. The one you may see in root directory is just an example for format, information  stored in there can not be accessed by subdirectories!

.env file should look like this:

```
COLUMBUS_URL = camino.network/rpc
PRIVATE_KEY = db726162738732732832932cd
```

> Working RPC endpoint can be found [here](https://docs.camino.network/guides/metamask-rpc-endpoints/index.html)
To access the private key refer to the next step

## 🛂 Retrieving your Camino Wallet private key

> Go to [Camino Wallet](https://suite.camino.network). Navigate to Manage Keys section

![image](https://github.com/juuroudojo/images/blob/main/Image%2016.08.2023%20at%2004.11.jpeg)

Click on View Static Key. Grab the top one.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2014.03.jpeg)

> ### ⚠️ Warning: Never share this private key with anyone! knowing this key presumes having full control over your wallet

## Retrieving your addres

> You often need to input your address as an arguments in this repo. Let's walk through a process of retrieving you address. Go to [Camino Wallet](https://suite.camino.network). 

> Log in and switch the network to Columbus. 

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2001.24.jpeg)

> Click on `C` in this menu

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2001.26.jpeg)

> This is the address we need. You can know it's the right one, if it matches the one in the top right.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2011.09.2023%20at%2001.28.jpeg)


## 🚰 Getting Columbus Network CAM tokens

Go to your [Camino Wallet](https://suite.camino.network)

Switch the network to columbus

On the porfolio page copy your X-chain address (it should start with X-columbus)

Go to [Camino Discord](https://discord.gg/camino)

In any of the text channels type /faucet and use the suggested command by entering the address you just copied and amount you want (You are limited to 25 a day). Wait for the transaction to go through.

![image](https://github.com/juuroudojo/toolsReal/blob/main/images/Image%2030.08.2023%20at%2014.06.jpeg)

Now we will need to transfer the tokens to C-chain. Go back to your Camino Wallet. Navigate to Cross Chain.

Set Source Chain to X Chain and Destination Chain to C Chain, send Max amount.


# 📟 [BACK TO MAINPAGE](https://github.com/chain4travel/camino-builder)