import '@xyrusworx/hardhat-solidity-json';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import '@nomiclabs/hardhat-solhint';
import '@primitivefi/hardhat-dodoc';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ganache: {
      allowUnlimitedContractSize: true,
      url: 'http://127.0.0.1:8545',
      chainId: 1337,
      accounts: ['0xd4d937fe90c767a103aa7cc54ed7dae1f9a501540f212231307049373595ddae'],
    },
  },
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    outputDir: './docgen',
    freshOutput: true,
  },
};

export default config;
