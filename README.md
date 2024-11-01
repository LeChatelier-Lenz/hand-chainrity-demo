# HandChainrity - 基于区块链的手链筹应用

## 项目概述

HandChain是一个基于Web3和区块链技术的手链筹应用，允许用户创建和参与手链筹活动。该应用利用智能合约管理用户信息和筹款活动，并通过NFT为每个参与者提供凭证。

## 项目结构

```
HandChain/
│
├── contracts/        # 包含hardhat初始化的项目
│   ├──contracts/     # 包含智能合约代码
│   │    ├── UserManagement.sol  # 用户管理合约
│   │    └── HandChainrity.sol         # 手链筹合约
│   └── ...
│
└── frontend/        # React前端应用
    └── ...          # React应用文件
```

## 环境要求

- [Node.js](https://nodejs.org/) 14.x 或以上
- [npm](https://www.npmjs.com/) 6.x 或以上
- [Hardhat](https://hardhat.org/) - 用于智能合约开发和测试

## 软件流程

###  启动与部署准备

#### 区块链（以太坊测试网）

1. 建立本地ganache测试网配置hardhat
   
   ```Solidity
   /* 
    *  /contracts/hardhat.config.ts
    */
   
   import { HardhatUserConfig } from "hardhat/config";
   import "@nomicfoundation/hardhat-toolbox";
   
   const config: HardhatUserConfig = {
     solidity: "0.8.27",
     networks: {
       ganache: {
         url: "http://localhost:8545", //填写本地ganache网络端口
         accounts: [
             //填写本地ganache网络中的各个账户密钥
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
   ```
   
2. 合约编译及部署
   
    在contracts文件夹下执行
   
   
   
   ```Solidity
   npx hardhat compile
   // windows环境
   ./deploy.ps1
   // 非windows环境
   npx hardhat ignition deploy .\ignition\modules\HandChainrity.ts --network ganache 
   ```
   
3. abi及地址文件配置

4. 将生成的/contracts/ignition/deployments/中的deployed_addresses.json的地址粘贴到前端utils/abi/文件夹下的contract-addresses.json文件

5. 将生成的/contracts/artifacts/contracts文件下的json文件转移到上述的abi文件夹下



#### 前端

  以下是前端启动流程的简要总结：

1. **依赖安装**：首先，执行 `npm install` 命令，安装项目所需的所有依赖，包括框架、组件库、样式处理库等。
2. **环境配置**：在 `.env` 文件中配置前端环境变量，确保所有后端 API 路径、密钥等资源链接正确，避免启动过程中缺少必要配置。
3. **开发服务器启动**：运行 `npm start`，启动本地开发服务器。此过程会编译并热更新项目代码，通过 `localhost:3000` 等地址查看项目。
4. **验证启动**：检查控制台和浏览器窗口确认是否存在错误信息。如有错误，根据提示修复。
5. **生成构建文件（可选）**：开发完成后，运行 `npm run build`，将代码编译成生产环境的优化版本，生成的静态文件通常存放在 `build` 文件夹中，方便部署。

#### 后端

1. 在启动后端服务之前，确保已安装所有必要的依赖项。可以通过以下命令从`requirement.txt`文件中下载所需的库：
   1. ```Bash
      pip install -r requirement.txt
      ```
   
2.    此命令会读取`requirement.txt`文件，自动安装所有列出的依赖项，确保环境配置正确。

3. 运行`server.py`:
   1. ​    在确保依赖项安装完成后，可以通过运行以下命令启动后端服务器：

   2. ```Bash
      python server.py
      ```
   
4.    此命令会执行`server.py`文件中的代码，启动FastAPI应用。

5. 访问API文档
   1. ​    一旦服务器成功运行，您可以通过浏览器访问以下链接查看FastAPI自带的接口文档：

   2. ​    `http://localhost:8888/docs`
   
6.    该页面提供了自动生成的API文档，展示了所有可用的路由及其详细信息，包括请求方法、参数、响应类型等。您可以直接在该页面上测试API接口，输入所需参数并发送请求，方便开发和调试。

7. 其他注意事项
   1. **确保端口开放**：如果在云服务器或特定网络环境中运行，确保本地的8888端口已开放，并允许外部访问。





###  软件使用流程

- **受益人身份申请** -> 2. **筹款活动受益人验证** -> 3. **第三方公证审核** -> 4. **筹款开放**
- **查看参与活动列表** -> 2. **活动完成（转账给受益人）** -> 3. **活动撤销（退回捐款）**

## 合约接口

- 用户管理合约和手链筹合约的接口文档详见 `contracts` 文件夹中的README.md

## 贡献

欢迎贡献！请提交Pull Request或创建Issue来报告问题。

## 许可证

本项目采用MIT许可证，详细信息请参见 LICENSE 文件。


