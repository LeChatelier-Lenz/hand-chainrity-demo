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

## 安装与使用

### 克隆项目

```bash
git clone https://github.com/LeChatelier-Lenz/hand-chainrity-demo.git
cd hand-chainrity-demo
```

### 智能合约部分

1. **安装依赖**：

```bash
cd contracts
npm install
```

2. **编译合约**：

```bash
npx hardhat compile
```

3. **部署合约**（根据你的网络设置进行修改）：

```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

### 前端部分

1. **进入前端文件夹并安装依赖**：

```bash
cd frontend
npm install
```

2. **启动开发服务器**：

```bash
npm start
```

3. **访问应用**：在浏览器中打开 `http://localhost:3000`

## 合约接口

- 用户管理合约和手链筹合约的接口文档详见 `contracts` 文件夹中的README.md

## 贡献

欢迎贡献！请提交Pull Request或创建Issue来报告问题。

## 许可证

本项目采用MIT许可证，详细信息请参见 LICENSE 文件。

### 说明

- 该README简要介绍了项目、结构、安装与使用步骤以及合约接口文档的位置。
- 可根据需要调整GitHub链接、许可证信息等内容。
