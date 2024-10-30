import { useEffect, useState } from "react";
import { checkCampaign, fetchLaunchedCampaigns } from "../actions/campaign";
import { CampaignType } from "../types/interfaces";
import { web3 } from "../utils/contracts";
import { Box, Button, Container, createTheme, Divider, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemText, PaletteMode, Paper, Radio, RadioGroup, TextField, ThemeProvider, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import getBlogTheme from "../theme/getBlogTheme";

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
const GanacheTestChainName = 'REChain'  //
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545' // Ganache RPC地址

export default function ThirdParty() {
  const [mode, setMode] = useState<PaletteMode>('light');
    // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const [account, setAccount] = useState<string | null>(null)
  const [campaignId, setCampaignId] = useState<number | null>(null)
  const [approve, setApprove] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "campaignId") {
      setCampaignId(parseInt(value));
    } else if (name === "approve") {
      setApprove(value === "true");
    }
  }

  //初始化时检查用户是否连接钱包
  useEffect(() => {
      const initCheckAccounts = async () => {
          // @ts-ignore
          const { ethereum } = window;
          if (Boolean(ethereum && ethereum.isMetaMask)) {
              // 尝试获取连接的用户账户
              const accounts = await web3.eth.getAccounts()
              if (accounts && accounts.length) {
                  setAccount(accounts[0])
              }
          }
      }
      initCheckAccounts()
  }, [])

      // 连接钱包
  const onClickConnectWallet = async () => {
      // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
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
          setAccount(accounts[0] || 'Not able to get accounts');
      } catch (error: any) {
          alert(error.message)
      }
  }

  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  useEffect(() => {
    fetchLaunchedCampaigns(setCampaigns);
    console.log(campaigns);
  }, [account]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkCampaign(campaignId!, approve!, account!);
  }

    return (
      <ThemeProvider theme={blogTheme}>
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 2 }} id="third-party" style={{height:"100%",alignItems: "center",justifyContent: "center",display: "flex", flexDirection: "column"}}>
        <Typography variant="h4">HandChainrity第三方审核平台</Typography>
        
        
      <Box style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}} sx={{ my:2,gap:2 }} >
        
        <Paper className="launched-list" style={{width:"70%",alignItems: "center",justifyContent: "center",display:"flex",flexDirection:"column"}} >
          <Typography sx={{my:1}} variant="h6">待审核筹款活动</Typography>

          <List sx={{ width: "100%", maxWidth: 600, height:"100%"}}>
            {campaigns.map((campaign) => (
              <Paper key={campaign.id} sx={{ mb: 2, p: 2, border: 1 }}>
                <ListItem>
                  <ListItemText
                    primary={`ID: ${campaign.id} - ${campaign.title}`}
                    secondary={
                      <>
                        <p>Description: {campaign.description}</p>
                        <p>Details: {campaign.details}</p>
                        <p>Target: {campaign.target} ETH</p>
                        <p>Current: {campaign.current} ETH</p>
                        <p>Deadline: {campaign.deadline.toISOString().split("T")[0]}</p>
                        <p>Beneficiary: {campaign.beneficiary}</p>
                        <p>Launcher: {campaign.launcher}</p>
                        <p>Status: {campaign.status}</p>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      
        <Box sx={{display: "flex", flexDirection: "column", gap: 2 ,alignItems: "center",justifyContent: "center",}}>
          <Paper sx={{ p: 4, width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 ,alignItems: "center",justifyContent: "center",}}>  
          <Button onClick={onClickConnectWallet} variant="contained" color="primary" size="small">
            连接有效账户地址
          </Button>
          <Typography variant="body1">已连接至: {account}</Typography>
          </Paper>
          <Paper sx={{ p: 4, width: "100%", maxWidth: 400, gap:2 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", }}>
                <FormControl sx={{gap:2}}>
                <TextField
                  label="Campaign ID"
                  name="campaignId"
                  value={campaignId}
                  onChange={handleChange}
                  size="small"
                />
                <FormLabel component="legend">是否要通过审核</FormLabel>
                <RadioGroup
                  sx={{display: "flex", flexDirection: "row",justifyContent: "center", alignItems: "center"}}
                  aria-label="approve"
                  name="approve"
                  value={approve}
                  onChange={handleChange}
                  style={{display: "flex", flexDirection: "row"}}
                >
                  <FormControlLabel value="true" control={<Radio />} label="通过" />
                  <FormControlLabel value="false" control={<Radio />} label="驳回" />
                </RadioGroup>
                <Button type="submit" variant="contained" color="primary" size="small">
                  确认
                </Button>
                </FormControl>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
        

        {/* <div style={{border: "1px solid black",display: "flex", flexDirection: "column"}}>
          <p>Choose any to Approve</p>
          <form onSubmit={handleSubmit}>
            <div style={{display: "flex", flexDirection: "row"}}>
              <caption>Approve Campaign : </caption>
              <input type="text" placeholder="Campaign ID" value={campaignId!} name="campaignId" onChange={handleChange} />
            </div>
            <label>
              <input type="radio" name="approve" value="yes" onChange={handleChange} />
              Yes
            </label>
            <label>
              <input type="radio" name="approve" value="no" onChange={handleChange} />
              No
            </label>
            <button type="submit" style={{border:"solid"}}>Submit</button>
          </form>
        </div> */}
      </Container>
      </ThemeProvider>
    );
  }