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
    apiKey: "RD4J55U199JV8JHND3HZDZB9P4JBVFWYT7",
  },
  networks: {
    aurora: {
      url: `https://aurora-testnet.infura.io/v3/fb35344adbec4a7981552fa6df10e607`,
      accounts: [
        "f7744aa258c35cc5f3b87307e022b7685241966b06061bccbf1315b978a00381",
      ],
    },
  },
};

export default config;
