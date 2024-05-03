import {ethers} from "hardhat";


async function main() {

  // const identityImplementation = await ethers.deployContract("Identity", [deployer.address, true]);
  // console.log(`Deploying identity implementation at ${identityImplementation.address} ... (tx hash: ${identityImplementation.deployTransaction.hash} )`);
  // await identityImplementation.deployed();
  // console.log(`Deployed identity implementation at ${identityImplementation.address} (tx hash: ${identityImplementation.deployTransaction.hash} )`);
  //
  // const implementationAuthority = await ethers.deployContract("ImplementationAuthority", [identityImplementation.address]);
  // console.log(`Deploying implementation authority at ${implementationAuthority.address} ... (tx hash: ${implementationAuthority.deployTransaction.hash} )`);
  // await implementationAuthority.deployed();
  // console.log(`Deployed implementation authority at ${implementationAuthority.address} (tx hash: ${implementationAuthority.deployTransaction.hash} )`);
  //
  // const factory = await ethers.deployContract("IdFactory", [implementationAuthority.address]);
  // console.log(`Deploying factory at ${factory.address} ... (tx hash: ${factory.deployTransaction.hash} )`);
  // await factory.deployed();
  // console.log(`Deployed factory at ${factory.address} (tx hash: ${factory.deployTransaction.hash} )`);


  const contractAdresses = ["0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1", "0xfB3Ce1611272f443B406BcE2e2dd1eEA85Ad340E", "0x72A4Bbe493FC0A724460C9940eE6FAE5f9209D61", "0x52CF8bDea5BAd21DFE627Bef7a5efc4558665884", "0x7005eae3556cba0A81c2bf486d98a1a033CEa180", "0x807dC7A1dDC10350E8197607e267650369ed5033","0x8a0d5408cCCe5F6d7496515C960Aa6D83c352651", "0x2C84990BbF49D95d9c826D061aDd2b538ffFda1B", "0xAF508a3EC6A80c6f6Bd916e346ECc0b6937B60bB", "0x388Ef493FaD03e3C73844Be82317017dEfdf6899",
    "0xFF824e87e92cE3dd3e74b9Ad04909a36d5E24400"];

  for (const adr of contractAdresses) {
    console.log(adr);
    console.log()
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
