# Have your own token on Columbus network

## 🏁 [Prepare the environment](https://github.com/chain4travel/camino-builder/README.MD#Quickstart)

> In `contracts/` you will find a file `Token.sol`. Give your token a fancy name and symbol.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.03.jpeg)

> Compile and Deploy the contract

```
npx hardhat compile
npx hardhat run scripts/deploy.ts --network columbus
```


> After the contract is successfully deployed you'll see the address of your token in the terminal. Copy this addres to clipboard.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.16.jpeg)

> Go to [Camino Wallet](https://suite.camino.network). Open homepage and click on Add Token. Paste the address from your terminal.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.21.jpeg)

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.29.jpeg)

> Congrats! Your token is on columbus. You should now be able to see your balance of your new token in the Assets menu.

![image](https://github.com/juuroudojo/images/blob/main/Image%2018.08.2023%20at%2001.34.jpeg)

> Run the script minting the tokens. You can modify the amount you want to be minted in `scripts/mint.ts`

```
npx hardhat run scripts/mint.ts --network columbus
```
Wait for transaction to go through

Feel free to send your newly established token to your friends.




# [BACK TO MAINPAGE](https://github.com/chain4travel/camino-builder)