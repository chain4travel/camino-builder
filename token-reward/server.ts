import dotenv from 'dotenv';
import Web3 from 'web3';
import path from 'path';
import ethers from 'ethers';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const NETWORK_URL = process.env.NETWORK_URL;
export const REWARD_CONTRACT_ADDRESS = process.env.REWARD_CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !NETWORK_URL || !REWARD_CONTRACT_ADDRESS) {
    throw new Error('Please make sure you have a .env file with the required variables.');
}

const web3 = new Web3(NETWORK_URL);
const contractName = 'Reward'; // Replace with your contract's name
const artifactsDir = path.join(__dirname, 'artifacts', 'contracts', `${contractName}.sol`);
const contractArtifact = require(path.join(artifactsDir, `${contractName}.json`));

const rewardContractAbi = contractArtifact.abi;
const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const rewardContract = new ethers.Contract(REWARD_CONTRACT_ADDRESS, rewardContractAbi, wallet);


export const rewardUser = async (userAddress: string, rewardAmount: number) => {
    try {
        // Call the reward function from your smart contract
        const tx = await rewardContract.reward(userAddress, rewardAmount);
        console.log('Transaction submitted:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Tokens rewarded to user:', userAddress);
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
};