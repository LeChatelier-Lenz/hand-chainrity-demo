import { Button, Card, CardContent, CardMedia, Chip, Divider, LinearProgress, TextField, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { donateToCampaign, fetchCampaignById, fetchFundraisingCampaigns, getParticipantCount } from "../../actions/campaign";
import { CampaignType } from "../../types/interfaces";
import { GanacheTestChainId, GanacheTestChainName, GanacheTestChainRpcUrl } from '../../utils/ganache';

export default function MainContent() {
  const [account, setAccount] = React.useState<string | null>(null);
  const [count, setCount] = React.useState<number>(0);
  const [donate, setDonate] = React.useState<string | null>("");
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const onClickDonateFunding = async () => {
    if (!account) {
      // @ts-ignore
      const { ethereum } = window;
      if (!Boolean(ethereum && ethereum.isMetaMask)) {
        alert('MetaMask is not installed!');
        return
      }
      try {
        // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
        if (ethereum.chainId !== GanacheTestChainId) {
          const chain = {
            chainId: GanacheTestChainId, // Chain-ID
            chainName: GanacheTestChainName, // Chain-Name
            rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
          };

          try {
            // 尝试切换到本地网络
            await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chain.chainId }] })
          } catch (switchError: any) {
            // 如果本地网络没有添加到Metamask中，添加该网络
            if (switchError.code === 4902) {
              await ethereum.request({
                method: 'wallet_addEthereumChain', params: [chain]
              });
            }
          }
        }
        // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
        await ethereum.request({ method: 'eth_requestAccounts' });
        // 获取小狐狸拿到的授权用户列表
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        // 如果用户存在，展示其account，否则显示错误信息
        console.log(accounts[0]);
        if (accounts && accounts.length) {
          localStorage.setItem('account', accounts[0]);
          setIsConnected(true);
        }
        setAccount(accounts[0] || 'Not able to get accounts');
      } catch (error: any) {
        alert(error.message)
      }
    }
    if (!account)
      alert('请先连接您的Metamask账户');
    else {
      if (donate)
        await donateToCampaign(campaign.id, parseFloat(donate), account!)
      else {
        alert("Please enter the amount of Ethereum you would like to contribute!")
      }
    }
  }

  const [campaign, setCampaign] = useState<CampaignType>({// 用于存储筛选后的 campaign
    id: 0,
    title: "治疗失眠医药公司天使轮",
    description: "帮陈其鹏买避孕套",
    details: "默认",
    target: 1000000,
    current: 100000,
    createdAt: new Date(),
    deadline: new Date(),
    beneficiary: "文豪",
    launcher: "陈其鹏",
    status: "默认",
    tag: "Donation-based Crowdfunding",
    field: "医药医疗",
    stage: "某医药公司天使轮"
  }); // Campaign[] is an array of Campaign objects


  let { id } = useParams(); // 获取路径中的 id 参数
  if (!id) {
    id = "1";
  }
  const campaign_id = parseInt(id!)

  useEffect(() => {
    try {
      fetchCampaignById(campaign_id, (fetchedCampaign: CampaignType) => {
        // Set fetched campaign data with default tag, field, and stage
        setCampaign({
          ...fetchedCampaign,
          tag: fetchedCampaign.tag || "Donation-based Crowdfunding",
          field: fetchedCampaign.field || "公益众筹",
          stage: fetchedCampaign.stage || "公益筹集第一轮",
        });
      });
      getParticipantCount(campaign_id, setCount);
    } catch (err: any) {
      console.error("查看错误", err);
    }
  }, [campaign_id]);



  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 10 }}>
      {campaign ? (<Card sx={{ display: 'flex', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: '750px', height: '630px', objectFit: 'cover', ml: 2 }}
          image={require("../../img/img4.jpg")} // Replace with your image URL
          alt="Sleep medicine"
        />

        {/* Right Content Section */}
        <CardContent sx={{ width: '45%' }}>
          <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>
            {campaign.field}          <Chip label={campaign.tag} sx={{ fontWeight: 'bold' }} />
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>
            {campaign.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, color: 'gray' }}>
            {campaign.stage}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
            发起者：<Chip label={campaign.launcher} color="primary" variant="outlined" />
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
            最终受益人：<Chip label={campaign.beneficiary} color="primary" variant="outlined" />
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
            项目概述：{campaign.description}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              已筹 {campaign.current} ETH
            </Typography>
            <LinearProgress variant="determinate" value={campaign.current * 100 / campaign.target} sx={{ height: 15, mt: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">目标金额 {campaign.target} ETH</Typography>
              <Typography variant="caption">{campaign.current * 100 / campaign.target} %</Typography>
            </Box>
          </Box>

          {/* Details */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 5 }}>
            <Typography variant="body2">{count} 名支持者</Typography>
            <Typography variant="body2">{Math.ceil((campaign.deadline.getTime() - campaign.createdAt.getTime()) / (1000 * 60 * 60 * 24))} 天剩余</Typography>
            {/* <Typography variant="body2">0 人看好</Typography> */}
          </Box>

          {/* Action Button */}
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>Donate</Typography>
              <TextField
                helperText="Please enter the amount of Ethereum you would like to contribute"
                size="medium"
                margin='normal'
                value={donate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDonate(event.target.value);
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}

                label="Price"
                variant="standard"
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 2 }}>ETH Now!</Typography>
            </Box>

            <Button variant="contained" sx={{ width: '100%' }} onClick={onClickDonateFunding}>
              立即支持
            </Button>
          </Box>


          {/* Project Date Info */}
          <Typography variant="caption" sx={{ mt: 1, color: 'gray' }}>
            此项目自 {campaign.createdAt.toISOString().split("T")[0]} 开始，需在 {campaign.deadline.toISOString().split("T")[0]} 前达到 {campaign.target} ETH 的目标才可成功
          </Typography>
        </CardContent>
      </Card>) : (
        <Typography variant="h6" align="center" sx={{ mt: 5 }}>
          Loading campaign details...
        </Typography>
      )}

      {/* Divider */}
      <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

      {/* Project Details and Risk Information Section */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex' }}>
          {campaign.id !== 0 && <Box sx={{ flex: 3, pr: 2 }}>
            <Typography variant="h6">项目详情</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.8 }}>
              项目详情 : {campaign.details}<br /><br />
              该团队成员位于中国大陆和新加坡，在医药保健品行业做研发设计超过5年，专注于失眠、健忘、精神衰弱治疗，
              并有相关产品，经过测试后效果良好。<span style={{ color: 'red' }}>众筹网的人员也亲身测试了药品，效果良好。</span>
              融资目标：100万元人民币，或者20万新币。
              <br /><br />
              天使轮众筹/融资的用途：
              <br />政府生产证书和批文
              <br />GMP工厂生产
              <br />商标注册
              <br />营销推广
              <br />电商平台上架和维护
              <br />运营等
              <br />
              在期间产品运营期间会持续研发。
            </Typography>
          </Box>}

          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderStyle: 'dashed' }} />

          <Box sx={{ flex: 2, pl: 2 }}>
            <Typography variant="h4" sx={{ mt: 1, lineHeight: 1.8, color: "red", fontWeight: "bold" }}>风险提示</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.8 }}>
              1. 点击“立即支持”，即表明您已阅读并同意《支持者协议》及《隐私政策》，并自愿承担由众筹相风险。
              <br /><br />
              2. 您参与众筹是支持将创意变为现实,将爱心广泛传播的过程，而不是直接的商品交易，请根据自己的判断谨慎选择。
              <br /><br />
              3. 众筹项目的回报将放及其他后续服务事项，请您根据自己的判断选择、支持众筹项目。
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}