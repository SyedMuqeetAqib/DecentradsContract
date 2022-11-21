import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/hardhat-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
          // https://docs.soliditylang.org/en/v0.8.14/internals/layout_in_storage.html
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {},
    aurora: {
      url: `https://aurora-testnet.infura.io/v3/fb35344adbec4a7981552fa6df10e607`,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-testnet-rpc.allthatnode.com:1317`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
