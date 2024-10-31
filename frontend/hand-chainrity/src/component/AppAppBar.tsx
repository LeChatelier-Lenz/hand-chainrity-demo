import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HandChainrityIcon from './HandChainrityIcon';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {  Menu } from '@mui/material';
import userImage from '../img/user.png';
import { GanacheTestChainId, GanacheTestChainName, GanacheTestChainRpcUrl } from '../utils/ganache';
import { useEffect } from 'react';
import { web3 } from '../utils/contracts';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  marginTop: '-5%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // 初始化导航钩子
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isLoggedIn = Boolean(userInfo.username); // 检查是否登录
  const [account, setAccount] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
                setIsConnected(true)
                localStorage.setItem('account', accounts[0]);
            }
        }
    }
      initCheckAccounts()
  }, [account])

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
        if (accounts && accounts.length){
          localStorage.setItem('account', accounts[0]);
          setIsConnected(true);
        }
        setAccount(accounts[0] || 'Not able to get accounts');
    } catch (error: any) {
        alert(error.message)
    }
  }
  

  const EllipsisMiddleTypography = ({ text="", length = 8 }) => {
    if (text.length <= length * 2) {
        return <Typography variant="body2">{text}</Typography>;
    }

    const start = text.slice(0, length);
    const end = text.slice(-length);
    return (
      <Tooltip title={text}>
        <Typography variant="body2" >
            {start}...{end}
        </Typography>
      </Tooltip>
    );
};

  const handleSignInClick = () => {
    navigate('/signin'); // 跳转到 signinsignup 页面
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // 可根据需求跳转到不同的路径
  };

  // 打开菜单
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoUser = () => {
    navigate('/root/user'); // 跳转到个人主页
    handleMenuClose();
  }

  // 退出登录逻辑
  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // 清除用户信息
    handleMenuClose();
    window.location.reload(); // 刷新页面
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 10 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <HandChainrityIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text"  onClick={() => { navigate("/root/campaign") }}>
                筹款活动
              </Button>
              <Button variant="text"  onClick={() => { navigate("/root/launch") }}>
                发起筹款
              </Button>
              <Button variant="text"  onClick={() => { navigate("/root/about") }}>
                关于我们
              </Button>
              {/* <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Blog
              </Button> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          > {isConnected ? (
            <>
              <EllipsisMiddleTypography text={'已连接至'+account || '未连接'} length={8} />
            </>
          ) : (
            <Button onClick={onClickConnectWallet} size="small" >
              <Typography variant="body1" >
                连接钱包
              </Typography>
            </Button>
          )
          }
            {isLoggedIn ? (
              <>
                <img src={userImage} alt="描述文字" style={{ width: '30px', height: 'auto' }} />
                <Button onClick={handleMenuOpen} size="small" >
                  
                  <Typography variant="body1" >
                    {userInfo.username || '未填写姓名'}
                  </Typography>
                  
                </Button>

                {/* 菜单组件 */}
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      width: '300px', // 让菜单适配文本长度
                    },
                  }}
                >
                  <MenuItem onClick={handleGoUser}>个人主页</MenuItem>
                  <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                </Menu>
              </>
            )
      : (
              <>
                <Button color="primary" variant="text"  onClick={handleSignInClick}>
                  登录
                </Button>
                <Button color="primary" variant="contained" onClick={handleSignUpClick}>
                  注册
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth onClick={handleSignUpClick}>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth  onClick={handleSignInClick}>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
