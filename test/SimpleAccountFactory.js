// SPDX-License-Identifier: GPL-3.0
const { ethers } = require("hardhat");
const { expect } = require("chai");

let SimpleAccountFactory,
  simpleAccountFactory,
  simpleAccount, deployer, user1, user2;
const salt = 12345;
const amount = ethers.utils.parseEther("1");

describe("SimpleAccountFactory", function () {
  before(async function () {
    // Get signers
    [deployer, user1, user2] = await ethers.getSigners();

    // Deploy SimpleAccountFactory
    SimpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
    simpleAccountFactory = await SimpleAccountFactory.deploy(deployer.address);
    await simpleAccountFactory.deployed();
  });

  it("Should create an account and return its address", async function () {
    // Create an account and check if the transaction was successful
    const createAccount = await simpleAccountFactory.createAccount(user1.address, salt);
    const receipt = await createAccount.wait();
    expect(receipt.status).to.equal(1);

    // Get the created account address
    const accountAddress = await simpleAccountFactory.getCreatedAddress(user1.address, salt);
    expect(accountAddress).to.be.properAddress;
  });

  it("Should check if an account exists", async function () {
    // Check if an account exists before
    const accountExistsBefore = await simpleAccountFactory.accountExists(user2.address, salt);
    expect(accountExistsBefore).to.equal(false);

    // Create an account
    await simpleAccountFactory.createAccount(user2.address, salt);

    // Check if an account exists after
    const accountExistsAfter = await simpleAccountFactory.accountExists(user2.address, salt);
    expect(accountExistsAfter).to.equal(true);
  });

  it("Should verify owner of an existing account", async function () {
    // Create an account
    const createAccount = await simpleAccountFactory.createAccount(user1.address, salt);
    createAccount.wait();
    
    // Get the created account address
    const createdAddress = await simpleAccountFactory.getCreatedAddress(user1.address, salt);

    // Retrieve the created account contract
    simpleAccount = await ethers.getContractAt("SimpleAccount", createdAddress);

    // Verify the account owner
    const accountOwner = await simpleAccount.owner();
    expect(accountOwner).to.equal(user1.address);
  });

  it("Should fund a wallet and get the balance", async function () {
    // Create an account
    await simpleAccountFactory.createAccount(user1.address, salt);

    // Fund the wallet
    await simpleAccountFactory.connect(user1).fundWallet(user1.address, { value: amount });

    // Get the balance
    const balance = await simpleAccountFactory.balanceOf(user1.address);    
    expect(balance).to.equal(amount);
  });
});