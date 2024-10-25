# HandChainrity 手链筹合约部分

> 接口文档（大致）

## 用户管理合约接口文档

### 合约地址
`UserManagement`

### 接口

#### 1. `registerUser(string memory username)`

- **描述**：注册新用户。
- **参数**：
  - `username`：用户的用户名（字符串）。
- **返回**：无。
- **事件**：`UserRegistered(address indexed userAddress, string username)`

#### 2. `isUserRegistered(address userAddress) view returns (bool)`

- **描述**：检查指定用户是否已注册。
- **参数**：
  - `userAddress`：用户的以太坊地址。
- **返回**：返回布尔值，表示用户是否注册。

#### 3. `getUserInfo(address userAddress) view returns (string memory username, bool isRegistered)`

- **描述**：获取指定用户的信息。
- **参数**：
  - `userAddress`：用户的以太坊地址。
- **返回**：
  - `username`：用户的用户名。
  - `isRegistered`：用户的注册状态。

#### 4. `deregisterUser()`

- **描述**：注销当前用户的账户。
- **参数**：无。
- **返回**：无。
- **事件**：`UserDeregistered(address indexed userAddress)`

---

## 手链筹合约接口文档

### 合约地址
`HandChainrity`

### 接口

#### 1. `createCampaign(string memory description, uint256 targetAmount, uint256 deadline)`

- **描述**：创建新的手链筹活动。
- **参数**：
  - `description`：手链筹的描述（字符串）。
  - `targetAmount`：目标筹款金额（整数）。
  - `deadline`：手链筹的截止时间（时间戳）。
- **返回**：无。
- **事件**：`CampaignCreated(uint256 campaignId, string description, uint256 targetAmount, uint256 deadline)`

#### 2. `participateInCampaign(uint256 campaignId) payable`

- **描述**：参与指定的手链筹活动。
- **参数**：
  - `campaignId`：手链筹的ID（整数）。
- **返回**：无。
- **事件**：`ContributionMade(uint256 campaignId, address indexed contributor, uint256 amount)`

#### 3. `getCampaignInfo(uint256 campaignId) view returns (string memory description, uint256 currentAmount, uint256 targetAmount, uint256 deadline)`

- **描述**：获取指定手链筹活动的信息。
- **参数**：
  - `campaignId`：手链筹的ID（整数）。
- **返回**：
  - `description`：手链筹的描述。
  - `currentAmount`：当前筹款金额。
  - `targetAmount`：目标筹款金额。
  - `deadline`：手链筹的截止时间。

#### 4. `finalizeCampaign(uint256 campaignId)`

- **描述**：完成指定的手链筹活动。
- **参数**：
  - `campaignId`：手链筹的ID（整数）。
- **返回**：无。
- **事件**：`CampaignFinalized(uint256 campaignId)`

---

这份接口文档简单列出了每个合约的主要功能和参数，方便开发人员理解和使用合约。