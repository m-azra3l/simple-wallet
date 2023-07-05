// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Deploy SimpleAccountFactory
  const [deployer] = await ethers.getSigners();
  
  // Compile contracts (optional if already compiled)
  await hre.run('compile');

  // Deploy the Contract
  console.log("Deploying SimpleAccountFactory...");
  const SimpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
  const simpleAccountFactory = await SimpleAccountFactory.deploy(deployer.address);

  await simpleAccountFactory.deployed();

  fs.writeFileSync(
    './src/contexts/contractAddress.js', 
  `export const contractAddress = '${simpleAccountFactory.address}';`
  );


  console.log("SimpleAccountFactory deployed at:", simpleAccountFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
