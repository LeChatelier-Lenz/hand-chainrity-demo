import { Button, Card, CardContent, CardMedia, Chip, Divider, LinearProgress, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCampaigns } from "../../actions/campaign";
import { CampaignType } from "../../types/interfaces";

export default function MainContent() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([{// 用于存储筛选后的 campaign
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
    tag:"Donation-based Crowdfunding",
    field:"医药医疗",
    stage:"某医药公司天使轮"
  }]); // Campaign[] is an array of Campaign objects

  const navigate = useNavigate(); // 初始化导航钩子


  // 模拟 fetchCampaigns 的数据获取
  useEffect(() => {
    fetchCampaigns((fetchedCampaigns: CampaignType[]) => {
      // 给每个 campaign 添加一个默认 tag
      const taggedCampaigns = fetchedCampaigns.map((campaign) => ({
        ...campaign,
        tag: "Donation-based Crowdfunding",
      }));
      // 设置获取到的所有 campaign 和默认显示的 campaign
      setCampaigns(taggedCampaigns);
      // 延迟 700 毫秒再执行 setLoad(false)
      });
  }, []);

  const { id } = useParams(); // 获取路径中的 id 参数

  

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 10 }}>
      <Card sx={{ display: 'flex', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: '55%', objectFit: 'cover' }}
          image={require("../../img/img2.jpg")} // Replace with your image URL
          alt="Sleep medicine"
        />
        
        {/* Right Content Section */}
        <CardContent sx={{ width: '45%' }}>
          <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>
            {campaigns[0].field}          <Chip label={campaigns[0].tag}  sx={{fontWeight:'bold' }} />
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>
            {campaigns[0].title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, color: 'gray' }}>
            {campaigns[0].stage}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2,fontWeight: 'bold'}}>
            发起者：<Chip label={campaigns[0].launcher} color="primary" variant="outlined"/>
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1,fontWeight: 'bold'}}>
            最终受益人：<Chip label={campaigns[0].beneficiary} color="primary" variant="outlined"/>
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1,fontWeight: 'bold'}}>
            项目概述：{campaigns[0].description}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              已筹 {campaigns[0].current} ETH
            </Typography>
            <LinearProgress variant="determinate" value={campaigns[0].current * 100/campaigns[0].target} sx={{ height: 15, mt: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">目标金额 {campaigns[0].target} ETH</Typography>
              <Typography variant="caption">{campaigns[0].current * 100/campaigns[0].target} %</Typography>
            </Box>
          </Box>

          {/* Details */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 ,mb:5}}>
            <Typography variant="body2">0 名支持者</Typography>
            <Typography variant="body2">{ Math.ceil((campaigns[0].deadline.getTime() - campaigns[0].createdAt.getTime()) / (1000 * 60 * 60 * 24)) } 天剩余</Typography>
            <Typography variant="body2">0 人看好</Typography>
          </Box>

          {/* Action Button */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {campaigns[0].target} ETH
            </Typography>
            <Button variant="contained" sx={{ mt: 1, width: '100%' }}>
              立即支持
            </Button>
          </Box>

          {/* Project Date Info */}
          <Typography variant="caption" sx={{ mt: 1, color: 'gray' }}>
            此项目自 {campaigns[0].createdAt.toISOString().split("T")[0]} 开始，需在 {campaigns[0].deadline.toISOString().split("T")[0]} 前达到 {campaigns[0].target} ETH 的目标才可成功
          </Typography>
        </CardContent>
      </Card>

      {/* Divider */}
      <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

      {/* Project Details and Risk Information Section */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 3, pr: 2 }}>
            <Typography variant="h6">项目详情</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.8 }}>
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
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderStyle: 'dashed' }} />

          <Box sx={{ flex: 2, pl: 2 }}>
            <Typography variant="h4" sx={{ mt: 1, lineHeight: 1.8, color:"red",fontWeight:"bold"}}>风险提示</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.8 }}>
              1. 点击“提交订单”，即表明您已阅读并同意《支持者协议》及《隐私政策》，并自愿承担由众筹相风险。
              <br /><br />
              2. 您参与众筹是支持将创意变为现实的过程，而不是直接的商品交易，因此存在一定风险。请根据自己的判断谨慎选择。
              <br /><br />
              3. 众筹项目的回报将放及其他后续服务事项，众筹发起人无法发起回报或。 
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}