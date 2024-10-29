import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Chip from '@mui/material/Chip';
import Campaign from "../pages/campaign"
import Launch from "../pages/launch"
import User from "../pages/user"
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { web3 } from "../utils/contracts";

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
const GanacheTestChainName = 'REChain'  //
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545' // Ganache RPC地址

// export default function Root() {


//     return (
//       <>
//         <div id="sidebar">
//             <nav>
//             <ul style={{display:"flex",flex:"row"}}>
//                 <li>
//                     <Link to="./campaign"> - Campaign </Link>
//                 </li>
//                 <li>
//                     <Link to="./launch"> | Launch </Link>
//                 </li>
//                 <li>
//                     <Link to="./user"> | User - </Link>
//                 </li>
//             </ul>
//             </nav>
//         </div>
        // <button style={{"border":"solid"}} onClick={onClickConnectWallet} type="button" className="btn btn-primary">Connect Wallet</button>
        // { account?
        //     <p>Connected Account: {account}</p>:
        //     <p>Not Connected</p>
        // }
        // <div id="detail" style={{border:"solid"}}>
        //     <Outlet context={{account:account}} />
        // </div>
//       </>
//     );
//   }


const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'donate',
        title: 'Donate Crowdfunding',
        icon: <MonetizationOnOutlinedIcon />,
        action: <Chip label={7} color="primary" size="small" />,
    },
    {
        segment: 'start',
        title: 'Start Crowdfunding',
        icon: <AddToDriveOutlinedIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <ListAltOutlinedIcon />,
        children: [
            {
                segment: 'followed',
                title: 'Your Followed Crowdfunding',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'created',
                title: 'Your Created Crowdfunding',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    // Define a function to select the correct component based on pathname
    // console.log("看看",pathname);

    // const [account, setAccount] = useState<string | null>(null)

    // //初始化时检查用户是否连接钱包
    // useEffect(() => {
    //     const initCheckAccounts = async () => {
    //         // @ts-ignore
    //         const { ethereum } = window;
    //         if (Boolean(ethereum && ethereum.isMetaMask)) {
    //             // 尝试获取连接的用户账户
    //             const accounts = await web3.eth.getAccounts()
    //             if (accounts && accounts.length) {
    //                 setAccount(accounts[0])
    //             }
    //         }
    //     }
    //     initCheckAccounts()
    // }, [])


    // // 连接钱包
    // const onClickConnectWallet = async () => {
    //     // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    //     // @ts-ignore
    //     const { ethereum } = window;
    //     if (!Boolean(ethereum && ethereum.isMetaMask)) {
    //         alert('MetaMask is not installed!');
    //         return
    //     }
    //     try {
    //         // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
    //         if (ethereum.chainId !== GanacheTestChainId) {
    //             const chain = {
    //                 chainId: GanacheTestChainId, // Chain-ID
    //                 chainName: GanacheTestChainName, // Chain-Name
    //                 rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
    //             };

    //             try {
    //                 // 尝试切换到本地网络
    //                 await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chain.chainId }] })
    //             } catch (switchError: any) {
    //                 // 如果本地网络没有添加到Metamask中，添加该网络
    //                 if (switchError.code === 4902) {
    //                     await ethereum.request({
    //                         method: 'wallet_addEthereumChain', params: [chain]
    //                     });
    //                 }
    //             }
    //         }
    //         // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
    //         await ethereum.request({ method: 'eth_requestAccounts' });
    //         // 获取小狐狸拿到的授权用户列表
    //         const accounts = await ethereum.request({ method: 'eth_accounts' });
    //         // 如果用户存在，展示其account，否则显示错误信息
    //         setAccount(accounts[0] || 'Not able to get accounts');
    //     } catch (error: any) {
    //         alert(error.message)
    //     }
    // }
    
    const renderComponent = () => {
        switch (pathname) {
            case '/donate':
                return <Campaign account="0x68686686868686868"/>;
            case '/start':
                return <Launch customProp="Value you want to pass" />;
            case '/reports/followed':
                return <User />;
            case '/reports/created':
                return <User />;
            default:
                return (
                    <Box
                        sx={{
                            py: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography>Dashboard content for {pathname}</Typography>
                    </Box>
                );
        }
    };

    return <>{renderComponent()}</>;
}

interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}
