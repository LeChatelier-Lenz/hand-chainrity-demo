// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title HandChainrity 手链筹核心业务合约
/// @author lechatelierlenz
/// @notice
contract HandChainrity is ERC721Enumerable, Ownable {
    enum Status {
        Launched,
        Fundraising,
        Rejected,
        LimitReached, //金额或者是时间
        Completed,
        Revoked
    }
    struct Campaign {
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 createdAt; //创建日期
        uint256 deadline; //截止日期
        address payable beneficiary; //受益人
        address launcher; //发起人
        uint256 hcuId; // 对应的筹款单元id
        Status status; // 状态
    }

    constructor() ERC721("HandChainNFT", "HCNFT") Ownable(msg.sender) {
        // 初始化
    }

    modifier onlyThirdPartyTrusted() {
        // msg.sender需要在第三方可信列表中
        require(thirdPartyTrusted[msg.sender], "Not A Trusted Third Party");
        _;
    }

    mapping(address => bool) public thirdPartyTrusted; //可信任第三方地址映射

    uint256[] public launchedCampaigns; // 已发起的活动（id）
    uint256[] public raisingCampaigns; // 筹款中的活动（id）
    // 活动id-活动信息映射表
    mapping(uint256 => Campaign) public campaigns; // 活动id => 活动信息
    mapping(uint256 => mapping(address => uint256)) public contributions; // 活动id => 参与者 => 参与金额
    mapping(uint256 => uint256) public childId;
    uint256 public campaignCount = 0; // 不会减少的活动计数器
    mapping(uint256 => address[]) public participants; // 活动id => 参与者列表
    mapping(address => uint256[]) public participantCampaigns; // 参与者 => 活动id列表

    // event
    event CampaignCreated(
        uint256 campaignId,
        string description,
        uint256 targetAmount,
        address beneficiary
    );
    event CampaignApproved(uint256 campaignId);
    event CampaignRejected(uint256 campaignId);
    event ContributionMade(
        uint256 campaignId,
        address indexed contributor,
        uint256 amount
    );
    event CampaignLimitReached(uint256 campaignId, string reason);
    event CampaignFinalized(uint256 campaignId);
    event campaignRevoked(uint256 campaignId);

    // 创建手链筹
    function createCampaign(
        string memory description,
        uint256 targetAmount,
        uint256 deadline,
        address payable beneficiary
    ) public returns (uint256) {
        require(targetAmount > 0, "Target amount must be greater than 0"); // 初始化时要保证筹款目标金额大于0
        require(beneficiary != address(0), "Beneficiary address must be valid"); // 受益人必须是有效地址
        campaignCount++;
        campaigns[campaignCount] = Campaign(
            description,
            targetAmount,
            0,
            block.timestamp,
            deadline,
            beneficiary,
            msg.sender,
            campaignCount,
            Status.Launched
        );
        launchedCampaigns.push(campaignCount);

        emit CampaignCreated(
            campaignCount,
            description,
            targetAmount,
            beneficiary
        );
        return campaignCount;
    }

    // 第三方可信平台审核手链筹
    function approveCampaign(
        uint256 campaignId,
        bool ifApproved
    ) public onlyThirdPartyTrusted {
        require(
            campaignId > 0 && campaignId <= campaignCount,
            "Invalid campaign ID"
        ); //
        require(
            campaigns[campaignId].status == Status.Launched,
            "Campaign is not Launched"
        ); //审核只能对已发起状态的手链筹单元进行
        // delete launchedCampaigns[campaignId];
        removingLaunchedCampign(campaignId);
        if (ifApproved == false) {
            campaigns[campaignId].status = Status.Rejected;
            emit CampaignRejected(campaignId);
            return;
        }
        campaigns[campaignId].status = Status.Fundraising;
        raisingCampaigns.push(campaignId);
        emit CampaignApproved(campaignId);
    }

    // 参与手链筹
    function participateInCampaign(
        uint256 campaignId
    ) public payable returns (bool) {
        require(
            campaignId > 0 && campaignId <= campaignCount,
            "Invalid campaign ID"
        );
        require(msg.value > 0, "Contribution must be greater than 0");
        require(
            msg.sender != campaigns[campaignId].beneficiary,
            "Shouldn't Donate for yourself"
        );
        // 当且仅当手链筹单元处于筹款状态时可参与
        require(
            campaigns[campaignId].status == Status.Fundraising,
            "Campaign is not in Fundraising State"
        );
        // 超过截止时间的筹款不再接受
        if (block.timestamp > campaigns[campaignId].deadline) {
            payable(msg.sender).transfer(msg.value);
            // 超过截止时间的筹款不再接受
            campaigns[campaignId].status = Status.LimitReached;
            removingRaisingCampign(campaignId);
            emit CampaignLimitReached(campaignId, "Campaign is Overdue");
            return false;
        }

        uint256 actulIn = msg.value;
        bool isReached = true;
        // 超过目标金额的筹款不再接受
        if (
            campaigns[campaignId].currentAmount + msg.value >
            campaigns[campaignId].targetAmount
        ) {
            actulIn =
                campaigns[campaignId].targetAmount -
                campaigns[campaignId].currentAmount; // 实际接受的金额
            payable(msg.sender).transfer(
                campaigns[campaignId].currentAmount +
                    msg.value -
                    campaigns[campaignId].targetAmount
            );
            campaigns[campaignId].status = Status.LimitReached;
            removingRaisingCampign(campaignId);
            emit CampaignLimitReached(campaignId, "Campaign is Over Target");
            isReached = false;
        }
        participantCampaigns[msg.sender].push(campaignId);
        campaigns[campaignId].currentAmount += actulIn;
        contributions[campaignId][msg.sender] += actulIn;

        // Mint NFT作为参与凭证（ERC721的作用）
        childId[campaignId]++; // 对应的campaign中nftid更新
        uint256 nftId = campaignId * 1000000 + childId[campaignId];
        //更新参与者列表
        participants[campaignId].push(msg.sender); //有一个重复捐款会导致重复加入的问题
        _mint(msg.sender, nftId); // 给参与者发行NFT作为凭证

        emit ContributionMade(campaignId, msg.sender, actulIn);
        return isReached;
    }

    // 完成手链筹
    function finalizeCampaign(uint256 campaignId) public payable {
        require(
            campaignId > 0 && campaignId <= campaignCount,
            "Invalid campaign ID"
        );
        require(
            msg.sender == campaigns[campaignId].beneficiary,
            "Not From Beneficiary"
        );
        // 完成手链筹没有严格要求，可以在受益人觉得合适的情况下提前结束
        require(
            campaigns[campaignId].status == Status.LimitReached ||
                campaigns[campaignId].status == Status.Fundraising,
            "Not Valid State to Finish"
        );
        // 将目前筹款全部转移给受益人
        uint256 fundAmount = AgencyFeeDeduct(
            campaigns[campaignId].currentAmount
        );
        campaigns[campaignId].beneficiary.transfer(fundAmount);

        removingRaisingCampign(campaignId);
        campaigns[campaignId].status = Status.Completed;
        delete childId[campaignId];
        emit CampaignFinalized(campaignId);
        // 资金释放逻辑可以在这里实现
    }

    // 撤销手链筹
    function revokeCampaign(uint256 campaignId) public payable {
        require(
            campaignId > 0 && campaignId <= campaignCount,
            "Invalid campaign ID"
        );
        require(
            msg.sender == campaigns[campaignId].beneficiary,
            "Not From Beneficiary"
        );
        require(
            campaigns[campaignId].status == Status.LimitReached ||
                campaigns[campaignId].status == Status.Fundraising ||
                campaigns[campaignId].status == Status.Launched,
            "Not Valid State to Finish"
        );
        // 一一退回所有筹款
        for (uint256 i = 0; i < participants[campaignId].length; i++) {
            uint256 refundAmount = AgencyFeeDeduct(
                contributions[campaignId][participants[campaignId][i]]
            );
            payable(participants[campaignId][i]).transfer(refundAmount);
        }
        campaigns[campaignId].status = Status.Revoked;
        removingRaisingCampign(campaignId);
        delete participants[campaignId];
        delete childId[campaignId];
        delete participantCampaigns[msg.sender][campaignId];
        address[] memory campaignParticipants = participants[campaignId];
        for (uint256 i = 0; i < campaignParticipants.length; i++) {
            delete contributions[campaignId][campaignParticipants[i]];
        }
        emit campaignRevoked(campaignId);
    }

    // 从筹款中活动列表删除某个活动
    function removingRaisingCampign(uint256 campaignId) internal {
        for (uint256 i = 0; i < raisingCampaigns.length; i++) {
            if (raisingCampaigns[i] == campaignId) {
                raisingCampaigns[i] = raisingCampaigns[
                    raisingCampaigns.length - 1
                ];
                raisingCampaigns.pop();
                return;
            }
        }
    }

    function removingLaunchedCampign(uint256 campaignId) internal {
        for (uint256 i = 0; i < launchedCampaigns.length; i++) {
            if (launchedCampaigns[i] == campaignId) {
                launchedCampaigns[i] = launchedCampaigns[
                    launchedCampaigns.length - 1
                ];
                launchedCampaigns.pop();
                return;
            }
        }
    }

    // 获取手链筹信息
    function getCampaignInfo(
        uint256 campaignId
    )
        public
        view
        returns (
            string memory description,
            uint256 currentAmount,
            uint256 targetAmount,
            address launcher,
            address beneficiary
        )
    {
        Campaign memory campaign = campaigns[campaignId];
        return (
            campaign.description,
            campaign.currentAmount,
            campaign.targetAmount,
            campaign.launcher,
            campaign.beneficiary
        );
    }

    // 获取正在筹款中的手链筹单元列表id
    function getActiveCampaignIdList() public view returns (uint256[] memory) {
        return raisingCampaigns;
    }

    // 获取已发起的手链筹单元列表id
    function getLaunchedCampaignIdList()
        public
        view
        returns (uint256[] memory)
    {
        return launchedCampaigns;
    }

    //获取对应账户的NFT列表: 这个先搁置一下 等一下再说
    function getNFTList(
        address account
    ) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(account);
        uint256[] memory nftList = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            nftList[i] = tokenOfOwnerByIndex(account, i);
        }
        return nftList;
    }

    // 获取参与者列表
    function getParticipants(
        uint256 campaignId
    ) public view returns (address[] memory) {
        return participants[campaignId];
    }

    // 获取参与者对应的筹款单元列表
    function getParticipantCampaigns(
        address account
    ) public view returns (uint256[] memory) {
        return participantCampaigns[account];
    }

    // 设置新的第三方可信平台
    function setNewThirdParty(address new_tp) public onlyOwner {
        thirdPartyTrusted[new_tp] = true;
    }

    function AgencyFeeDeduct(uint256 amount) internal pure returns (uint256) {
        return (amount * 9995) / 10000; // 0.05%的手续费
    }
}
