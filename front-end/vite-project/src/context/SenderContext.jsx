import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const SenderContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {
    // TODO: Require network to be columbus
    // Using the network user has opened in metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Creating the contract by passing :
    // - address of the deployed contract
    // - abi of the contract (imported from constants) (In order to retrieve the abi within)
    // - instance of an account calling the transaction
    const senderContract = new ethers.Contract(contractAddress, contractABI, signer);

    return senderContract;
}

export const SenderProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState([])

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // Retrieving data about transactions from our deployed smart contract
    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert ("Please install wallet software")

            // getting the contract instance
            const senderContract = getEthereumContract()
            // calling the getAllTransactions() in our smart contract
            const availableTransactions = await senderContract.getAllTransactions()

            // structuring the return value from our function
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            
            setTransactions(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install wallet software");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0])

                getAllTransactions()
            } else {
                console.log("No account found!")
            }
        } catch (error) {
            
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const senderContract = await getEthereumContract()
            const transactionCount = await transactionCount.getTransactionCount()

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    // Connecting the wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install wallet software!");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {

            const { addressTo, amount, message} = formData;
            // getting the Contract object returned by getEthereumContract()
            const senderContract = getEthereumContract();
            // converting input data into wei (Basically appending 18 zeros, Input: 0.1 ether = 0.1 * 10 ** 18, (Ether has a denomination of 18))
            const parsedAmount = ethers.utils.parseEther(amount);

            // A way to send CAM tokens without interacting with a contract

            // await ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [{
            //         from: currentAccount,
            //         to: addressTo,
            //         gas: '0x5208', //needs to be hexadecimal (== 21000 gWei)
            //         value: parsedAmount._hex, // 
            //     }]
            // });

            // Calling the function transfer in our SendCAM contract
            const transaction = await senderContract.transfer(addressTo, message, {value: parsedAmount})

            // Loading when while transaction is being processed
            setIsLoading(true);
            console.log('Loading - ${transaction.hash}')

            await transaction.wait() // We will only proceed to the next line when transaction is processed

            setIsLoading(false)
            console.log('Success - ${transaction.has}')

            // grabbing transactionCounter from our contract
            const transactionCount = await senderContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            } else {
                console.log("No ethereum object");
            }

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    useEffect(() => {
       checkIfWalletIsConnected();
       checkIfTransactionsExist();
    }, []);

    return (
        <SenderContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
          {children}
        </SenderContext.Provider>
      );
}