const hre = require("hardhat");

async function main() {
  const ProofPort = await ethers.getContractFactory("ProofPort");
  const contract = await ProofPort.deploy();
  await contract.waitForDeployment();

  console.log(`✅ Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

