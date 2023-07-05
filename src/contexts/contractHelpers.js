'use client';
import { ethers } from 'ethers';
import SimpleAccountFactory  from '../../artifacts/contracts/samples/SimpleAccountFactory.sol/SimpleAccountFactory.json'
import { contractAddress } from './contractAddress';
import { config } from './config';
import { Client, Presets } from 'userop';
import Web3Modal from 'web3modal';

const shortenAddress = (strAddress) => {
    return strAddress.slice(0, 6) + "..." + strAddress.slice(-4)
};

const salt = 1234;

const connectContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SimpleAccountFactory.abi, signer);
        return contract
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const accountExist = async (address) => {
    try {
        const contract = await connectContract();
        const account = await contract.accountExists(address, salt);
        return account;
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const createAccount = async (address) => {
    try {
        const contract = await connectContract();
        const accountTx = await contract.createAccount(address, salt);
        console.log("newAccount ", accountTx);
        if (accountTx !== null || accountTx !== undefined) {
            return true;
        }
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const openWallet = async (address) => {
    try {
        const contract = await connectContract();
        const account = await contract.getCreatedAddress(address, salt);
        return account;
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const fundAccount = async (address, amount) => {
    try {
        const contract = await connectContract();
        const amt = ethers.utils.parseEther(amount);
        const accountTx = await contract.fundWallet(address, {value: amt});
        const receipt = await accountTx.wait();
        if (receipt.status === 1) {
            return true;
        }
        console.log(`Transaction hash: ${accountTx.hash}`);
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const getBalance = async (address) => {
    try {
        const contract = await connectContract();
        let balance = await contract.balanceOf(address);
        balance = parseFloat(balance);
        // const mbalance = (balance / 1000000000000000000).toFixed(2);
        // return mbalance;
        return balance;
    }
    catch (error) {
        throw new Error("Error", error);
    }
};

const transferFunds = async (address, amount) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        let opts = "";
        const paymaster = opts.withPM
            ? Presets.Middleware.verifyingPaymaster(
                config.paymaster.rpcUrl,
                config.paymaster.context
            )
            : undefined;
        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            signer,
            config.rpcUrl,
            config.entryPoint,
            config.simpleAccountFactory,
            paymaster
        );
        const client = await Client.init(config.rpcUrl, config.entryPoint);

        const target = ethers.utils.getAddress(address);
        const value = ethers.utils.parseEther(amount);
        const res = await client.sendUserOperation(
            simpleAccount.execute(target, value, "0x"),
            {
                dryRun: opts.dryRun,
                onBuild: (op) => console.log("Signed UserOperation:", op),
            }
        );
        console.log(`UserOpHash: ${res.userOpHash}`);
        console.log("Waiting for transaction...");
        const ev = await res.wait();
        console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
        init();
        return [true, ev.transactionHash];
    } catch (error) {
        throw new Error("Error", error);
    }
};

export {
    shortenAddress,
    connectContract,
    accountExist,
    createAccount,    
    openWallet,
    fundAccount,
    getBalance,
    transferFunds
}