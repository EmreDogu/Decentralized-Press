// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const News = await hre.ethers.getContractFactory("News");
  
  const news = await News.deploy();
  await news.deployed();

  console.log("News deployed to:", news.address);

  saveAddress(news);
}

function saveAddress(contract) {
  const fs = require("fs");
  fs.writeFileSync("./src/artifacts/contracts/News.sol/address.json", JSON.stringify({address: contract.address}, undefined, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
