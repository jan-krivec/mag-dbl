/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  paths: {
    sources: "./src/contracts",
    cache: "./cache",
    artifacts: "./src/artifacts"
  },
};
