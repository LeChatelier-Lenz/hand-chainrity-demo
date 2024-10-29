import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {web3} from "../utils/contracts"; 

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
const GanacheTestChainName = 'REChain'  //
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8546' // Ganache RPC地址

export default function Root() {
    const [account, setAccount] = useState<string | null>(null)

    //初始化时检查用户是否连接钱包
    useEffect(() => {
        const initCheckAccounts = async () => {
            // @ts-ignore
            const {ethereum} = window;
            if (Boolean(ethereum && ethereum.isMetaMask)) {
                // 尝试获取连接的用户账户
                const accounts = await web3.eth.getAccounts()
                if(accounts && accounts.length) {
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
        const {ethereum} = window;
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
                    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
                } catch (switchError: any) {
                    // 如果本地网络没有添加到Metamask中，添加该网络
                    if (switchError.code === 4902) {
                        await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                        });
                    }
                }
            }
            // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
            await ethereum.request({method: 'eth_requestAccounts'});
            // 获取小狐狸拿到的授权用户列表
            const accounts = await ethereum.request({method: 'eth_accounts'});
            // 如果用户存在，展示其account，否则显示错误信息
            setAccount(accounts[0] || 'Not able to get accounts');
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
      <>
        <div id="sidebar">
            <nav>
            <ul style={{display:"flex",flex:"row"}}>
                <li>
                    <Link to="./campaign"> - Campaign </Link>
                </li>
                <li>
                    <Link to="./launch"> | Launch </Link>
                </li>
                <li>
                    <Link to="./user"> | User - </Link>
                </li>
            </ul>
            </nav>
        </div>
        <button style={{"border":"solid"}} onClick={onClickConnectWallet} type="button" className="btn btn-primary">Connect Wallet</button>
        { account?
            <p>Connected Account: {account}</p>:
            <p>Not Connected</p>
        }
        <div id="detail" style={{border:"solid"}}>
            <Outlet context={{account:account}} />
        </div>
      </>
    );
  }