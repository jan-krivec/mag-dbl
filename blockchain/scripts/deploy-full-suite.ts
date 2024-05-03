import {ethers} from "hardhat";
import OnchainID from '@onchain-id/solidity';


async function main() {
  const [deployer] = await ethers.getSigners();

  // const identityImplementation = await new ethers.ContractFactory(
  //     OnchainID.contracts.Identity.abi,
  //     OnchainID.contracts.Identity.bytecode,
  //     deployer,
  // ).deploy(deployer.address, true);
//
  // await identityImplementation.deployed();
  // console.log(`Deployed identity implementation for wallet ${deployer.address} at ${identityImplementation.address} (tx hash: ${identityImplementation.deployTransaction.hash} )`);
//
  // console.log('--------------------------------------------------');
//
  // const identityImplementationAuthority = await new ethers.ContractFactory(
  //     OnchainID.contracts.ImplementationAuthority.abi,
  //     OnchainID.contracts.ImplementationAuthority.bytecode,
  //     deployer,
  // ).deploy(identityImplementation.address);
//
  // await identityImplementationAuthority.deployed();
  // console.log(`Deployed implementation authority at ${identityImplementationAuthority.address} (tx hash: ${identityImplementationAuthority.deployTransaction.hash} )`);
//
  // console.log('--------------------------------------------------');
//
  // const idFactory = await new ethers.ContractFactory(OnchainID.contracts.Factory.abi, OnchainID.contracts.Factory.bytecode, deployer).deploy(
  //     identityImplementationAuthority.address,
  // );
//
  // await idFactory.deployed();
  // console.log(`Deployed idFactory at ${idFactory.address} (tx hash: ${idFactory.deployTransaction.hash} )`);
//
  // console.log('--------------------------------------------------');

  // const contractAdresses = ["0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1", "0xfB3Ce1611272f443B406BcE2e2dd1eEA85Ad340E", "0x72A4Bbe493FC0A724460C9940eE6FAE5f9209D61", "0x52CF8bDea5BAd21DFE627Bef7a5efc4558665884", "0x7005eae3556cba0A81c2bf486d98a1a033CEa180", "0x807dC7A1dDC10350E8197607e267650369ed5033","0x8a0d5408cCCe5F6d7496515C960Aa6D83c352651", "0x2C84990BbF49D95d9c826D061aDd2b538ffFda1B", "0xAF508a3EC6A80c6f6Bd916e346ECc0b6937B60bB", "0x388Ef493FaD03e3C73844Be82317017dEfdf6899",
  //   "0xFF824e87e92cE3dd3e74b9Ad04909a36d5E24400"];
//
  // for (const i in contractAdresses) {
  //   const addr = contractAdresses[i];
  //   const tx = await idFactory.createIdentity(addr, addr);
//
  //   await tx.wait();
  //   const identityAddress = await idFactory.getIdentity(addr);
//
  //   console.log(`Deployed a new identity for ca ${addr} at ${identityAddress} as a proxy using idFactory. tx: ${tx.hash}`);
  //   console.log('--------------------------------------------------');
  // }

  // const claimIssuerPK = ['0x79fe9033f56b2f269f0035dea5bd09b9ce36c06b58810a803a35045f51b5585e', '0xdb10c278e8be74a6f548b72900118f961f3f0d9a690fa7d7ed0cb9cc5d707957', '0x0a979d6becf36eb9192752c5f5ab5435bcd9fe29cd5ccf20bdf8486c13c0fbc9'];
//
  // for (const i in claimIssuerPK) {
  //   const wallet = new ethers.Wallet(claimIssuerPK[i]);
  //   const claimIssuer = await ethers.deployContract("contracts/ONCHAINID/ClaimIssuer.sol:ClaimIssuer", [wallet.address]);
  //   await claimIssuer.deployed();
  //   console.log(`Deployed Claim Issuer for wallet ${wallet.address} at address ${claimIssuer.address} !`);
  //   console.log('--------------------------------------------------');
  // }

  console.log('Deployment of TREX Factory');

  // const claimTopicsRegistryImplementation = await ethers.deployContract('ClaimTopicsRegistry', deployer);
  // await claimTopicsRegistryImplementation.deployed();
  // console.log('Deployed claimTopicsRegistryImplementation');
  // const trustedIssuersRegistryImplementation = await ethers.deployContract('TrustedIssuersRegistry', deployer);
  // await trustedIssuersRegistryImplementation.deployed();
  // console.log('Deployed trustedIssuersRegistryImplementation');
  // const identityRegistryStorageImplementation = await ethers.deployContract('IdentityRegistryStorage', deployer);
  // await identityRegistryStorageImplementation.deployed();
  // console.log('Deployed identityRegistryStorageImplementation');
  // const identityRegistryImplementation = await ethers.deployContract('IdentityRegistry', deployer);
  // await identityRegistryImplementation.deployed();
  // console.log('Deployed identityRegistryImplementation');
  // const modularComplianceImplementation = await ethers.deployContract('ModularCompliance', deployer);
  // await modularComplianceImplementation.deployed();
  // console.log('Deployed modularComplianceImplementation');
  // const tokenImplementation = await ethers.deployContract('Token', deployer);
  // await tokenImplementation.deployed();
  // console.log('Deployed tokenImplementation');

  // const trexImplementationAuthority = await ethers.deployContract(
  //     'TREXImplementationAuthority',
  //     [true, ethers.constants.AddressZero, ethers.constants.AddressZero],
  //     deployer,
  // );
//
  // await trexImplementationAuthority.deployed();
//
  // console.log(`Deployed TREXImplementationAuthority at ${trexImplementationAuthority.address}`)
//
  // console.log('--------------------------------------------------');

  // const versionStruct = {
  //   major: 4,
  //   minor: 1,
  //   patch: 0,
  // };
//
  // const contractsStruct = {
  //   tokenImplementation: tokenImplementation.address,
  //   ctrImplementation: claimTopicsRegistryImplementation.address,
  //   irImplementation: identityRegistryImplementation.address,
  //   irsImplementation: identityRegistryStorageImplementation.address,
  //   tirImplementation: trustedIssuersRegistryImplementation.address,
  //   mcImplementation: modularComplianceImplementation.address,
  // };

  // console.log(contractsStruct);
//
  // const txResponse = await trexImplementationAuthority.connect(deployer).addAndUseTREXVersion(versionStruct, contractsStruct);
//
  // const receipt = await txResponse.wait();
//
  // console.log(receipt.status);  // Check if status is 1 (success)
//
  // console.log(`Applied version for TREX Implementation Authority  at ${trexImplementationAuthority.address}`)

  const agentDetails = {
    irAgents: ['0x807dC7A1dDC10350E8197607e267650369ed5033', '0x8a0d5408cCCe5F6d7496515C960Aa6D83c352651'], // Array of addresses for irAgents
    tokenAgents: ['0x2C84990BbF49D95d9c826D061aDd2b538ffFda1B', '0xAF508a3EC6A80c6f6Bd916e346ECc0b6937B60bB'], // Array of addresses for tokenAgents
    dblAgents: ['0x388Ef493FaD03e3C73844Be82317017dEfdf6899', '0xFF824e87e92cE3dd3e74b9Ad04909a36d5E24400'], // Array of addresses for dblAgents
  };

  const trexFactory =  await ethers.deployContract('TREXFactory', ['0x7C0Aa5f3B4c3a4663dB178DC4303A736b1A01DB1', '0x53AB0675C2b36489A15d8169BA7E2bb218641dB7']);

  await trexFactory.deployed();
  console.log(`Deployed TREX Factory at ${trexFactory.address}`)

  const txResponse2 = await trexFactory.connect(deployer).setAgents(agentDetails);

  const receipt2 = await txResponse2.wait();

  console.log('Set agents\n ' + JSON.stringify(agentDetails));

  //const txResponse3 = await idFactory.connect(deployer).addTokenFactory(trexFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
