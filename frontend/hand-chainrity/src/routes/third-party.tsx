import { useEffect, useState } from "react";
import { checkCampaign, fetchLaunchedCampaigns } from "../actions/campaign";
import { CampaignType } from "../types/interfaces";
import { web3 } from "../utils/contracts";

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
      setApprove(value === "yes" ? true : false);
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
        <ul style={{border: "1px solid black"}}>
          {
            campaigns.length === 0 ? <li>No Campaigns</li> : campaigns.map((campaign) => (
              <li key={campaign.id}>
                <h2>{campaign.title}</h2>
                <p>{campaign.description}</p>
                <p>{campaign.details}</p>
                <p>{campaign.target}</p>
                <p>{campaign.current}</p>
                <p>{campaign.deadline.toISOString()}</p>
                <p>{campaign.beneficiary}</p>
                <p>{campaign.launcher}</p>
                <p>{campaign.status}</p>
              </li>
            ))
          } 
        </ul>
        <div style={{border: "1px solid black",display: "flex", flexDirection: "column"}}>
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
        </div>

      </div>
    );
  }