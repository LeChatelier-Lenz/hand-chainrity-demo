import { useEffect, useState } from "react";
import { checkCampaign, fetchLaunchedCampaigns } from "../actions/campaign";
import { CampaignType } from "../types/interfaces";
import { web3 } from "../utils/contracts";
import { Box, Button, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemText, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { Form } from "react-router-dom";

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
const GanacheTestChainName = 'REChain'  //
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545' // Ganache RPC地址

export default function ThirdParty() {

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
      <div id="third-party" style={{border: "1px solid black",alignItems: "center",justifyContent: "center",display: "flex", flexDirection: "column"}}>
        <h1>Third Party</h1>
        <p>
          This is the third party page.
        </p>
        <button onClick={onClickConnectWallet}>Connect Wallet</button>
        <p>Campaign List to be Approved : </p>
        <List sx={{ width: "100%", maxWidth: 600 }}>
        {campaigns.map((campaign) => (
          <Paper key={campaign.id} sx={{ mb: 2, p: 2 }}>
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
        <Paper sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
            <TextField
              label="Campaign ID"
              name="campaignId"
              value={campaignId}
              onChange={handleChange}
              fullWidth
            />
            <FormLabel component="legend">Approve</FormLabel>
            <RadioGroup
              aria-label="approve"
              name="approve"
              value={approve}
              onChange={handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            </FormControl>
          </Box>
        </form>
      </Paper>

      </div>
    );
  }