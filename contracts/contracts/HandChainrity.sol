// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserManagement.sol"; // 引入用户管理合约

contract HandChainrity is ERC721, ERC721Burnable, Ownable {
    struct Campaign {
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        address creator;
        bool isCompleted;
        uint256 nftId; // 对应的NFT ID
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public campaignCount;

    UserManagement public userManagement;

    event CampaignCreated(uint256 campaignId, string description, uint256 targetAmount, uint256 deadline);
    event ContributionMade(uint256 campaignId, address indexed contributor, uint256 amount);
    event CampaignFinalized(uint256 campaignId);

    constructor(address userManagementAddress) ERC721("HandChainNFT", "HCNFT") {
        userManagement = UserManagement(userManagementAddress);
    }

    // 创建手链筹
    function createCampaign(string memory description, uint256 targetAmount, uint256 deadline) public {
        require(userManagement.isUserRegistered(msg.sender), "User must be registered");
        campaignCount++;
        campaigns[campaignCount] = Campaign(description, targetAmount, 0, deadline, msg.sender, false, 0);
        emit CampaignCreated(campaignCount, description, targetAmount, deadline);
    }

    // 参与手链筹
    function participateInCampaign(uint256 campaignId) public payable {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        require(msg.value > 0, "Contribution must be greater than 0");
        require(!campaigns[campaignId].isCompleted, "Campaign is already completed");

        campaigns[campaignId].currentAmount += msg.value;
        contributions[campaignId][msg.sender] += msg.value;

        // Mint NFT作为参与凭证
        uint256 nftId = campaignId * 1000 + contributions[campaignId][msg.sender]; // 简单的ID生成逻辑
        _mint(msg.sender, nftId); // 发行NFT
        campaigns[campaignId].nftId = nftId;

        emit ContributionMade(campaignId, msg.sender, msg.value);
    }

    // 获取手链筹信息
    function getCampaignInfo(uint256 campaignId) public view returns (string memory description, uint256 currentAmount, uint256 targetAmount, uint256 deadline) {
        Campaign memory campaign = campaigns[campaignId];
        return (campaign.description, campaign.currentAmount, campaign.targetAmount, campaign.deadline);
    }

    // 完成手链筹
    function finalizeCampaign(uint256 campaignId) public {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        require(block.timestamp >= campaigns[campaignId].deadline, "Campaign deadline not reached");
        require(!campaigns[campaignId].isCompleted, "Campaign already completed");

        campaigns[campaignId].isCompleted = true;
        emit CampaignFinalized(campaignId);
        
        // 资金释放逻辑可以在这里实现
    }
}
