import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://localhost:8545",
      accounts: [
        //zhpy
        // "0xc3db4970afb555b6139c86c5772f30b37e01eaee212eca21977b54f9717c2cbb",
        // "0xd00165801bda34d7833092c2de95d80aac2fff56920f817535f9e97024256bb8",
        // "0x3a13d77dccfb0b14005ec99452bde46b2a9a49e4b18bc6270d90273104688f80",
        //wenhao666
        "0x08ae3c456a5a229cb56e17fb57173fa00cc34075079f784b7aa6c1f5221037c5",
        "0xa8b2a09811c77b41967edd15c41160c29caff261bc4c03175148d92d49cb8caa",
        "0x48cb577b784aae69be012a24e11cdd0210742ae63ac498eb656141364ed0ae3f",
        "0xe87bb104bf2fba2c53e6a35c2d0868df2f5c9f48a04e7fec279a8e89a0b8ae8b",
        //qipeng
        // "0x4987a79da4c345b5b680631045117fd1d78d0defd2eced948a41ec5bcf5a13a0",
        // "0xe9f1c9a1d451a5f179019d417d5b6200ab2c947ac2e687adecdafc011feae325",
        // "0xa8e81b53ba369b8bd6544c4a16f24dd1c362d21aa364c1d3f70586ce6fdb2f65",
        // "0xc3f83ebbae42112631d411658711708145cb8d2d9700eeb4da24f08dc8c5bfdb",
        // "0xe35647aa5beeb40fc4e461cc61caae2aecd34c891b8e5132c3205ad01bc83eaf",
        // "0x606a9d616a9a798ac9d4eb0ab6b78790bc894b74a31139ceb7660ec4e81ceb95",
        // "0x8e6146d241d52296f0a215bdd89acdda6623542e33f4a770241a2a8c04a1db60",
        // "0x2db1dea6af5d07ce74f9791e5e74e23c28fcae02605d022eb665c523aa773706"
      ]
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
