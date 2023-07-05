# NEO-Wallet

This project showcases the implementation of account abstraction EIP-4337, which enables users to create and fund multiple wallets within a smart wallet system based on `Account Abstraction`.

## Getting Started

Download the codes by downloading the entire repository, in the project directory,  run the following command to install the dependencies:

```shell
 yarn install
```

To deploy the contract, setup your `.env` file by renaming the `.env.example` file to `.env`, paste your wallet private key where necessary and run the following command:

```shell
yarn hardhat run scripts/deploy.js --network mumbai
```

To start the project, run the following command:

```shell
yarn run dev
```

To test the smart contract, run the following command:

```shell
yarn hardhat test 
```

### Prerequisites

- Solidity version 0.8.12 or higher
- OpenZeppelin contracts: Create2.sol, ERC1967Proxy.sol

## Overview

The SimpleAccountFactory contract enables users to create and manage SimpleAccount contracts, which handle user balances. It follows a specific process to ensure proper initialization and compatibility with entry point contracts.

### Simple Account Factory

The SimpleAccountFactory contract serves as a sample factory contract for creating SimpleAccount contracts. It leverages the Create2 library from OpenZeppelin to generate counterfactual addresses for the accounts. It also incorporates an ERC1967Proxy to facilitate the upgradability of the SimpleAccount contract.

### SimpleAccount Contract

The SimpleAccount contract is utilized as the implementation contract within the factory. It requires an entry point contract address during initialization. SimpleAccount stores user account information and offers various functionalities.

### Factory Initialization

During the deployment of the SimpleAccountFactory contract, an entry point contract (IEntryPoint) must be provided as a constructor parameter. This entry point contract will be used for initializing the SimpleAccount contracts.

#### Account Creation

The `createAccount` function is responsible for creating a new account and returning its address. It handles cases where the account already exists, ensuring that the `entryPoint.getSenderAddress()` function works correctly regardless of whether the account was just created or already existed.

If the account doesn't exist, the function creates a new instance of the ERC1967Proxy contract by passing the addresses of the accountImplementation contract and the owner as initialization parameters. The function then returns the address of the proxy.

#### Wallet Funding

The `fundWallet` function allows users to add funds to a specific account. It takes the account's address as a parameter and increases the balance associated with that account by the amount of Ether sent with the function call.

#### Counterfactual Address Calculation

The `getCreatedAddress` function calculates the counterfactual address of an account based on the provided parameters. It utilizes the `computeAddress` function from the Create2 library, passing the salt and the initialization code of the ERC1967Proxy contract along with the addresses of the accountImplementation contract and the owner.

#### Wallet Balance

The `balanceOf` function enables users to check the balance of a specific account by providing its address. It returns the current balance associated with the account.

### Usage

To utilize this factory contract, follow these steps:

1. Deploy the SimpleAccountFactory contract, specifying the desired entry point contract address during deployment.
2. Call the `createAccount` function, providing the owner's address and a unique salt value as parameters. This will create a new SimpleAccount contract or return the address of an existing account.
3. Use the `fundWallet` function to add funds to the created account by specifying the amount to send with the function call.

Note: Ensure that you include the required OpenZeppelin contracts, specifically Create2.sol and ERC1967Proxy.sol, in your Solidity project.

Feel free to customize and modify this contract to suit your specific use case.

## Author

[Michael](https://github.com/m-azra3l)

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This project is but an example project, it is not for the purpose of commercial use.
