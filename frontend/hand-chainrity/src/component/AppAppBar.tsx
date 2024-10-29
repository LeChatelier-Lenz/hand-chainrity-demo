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
import Sitemark from './SitemarkIcon';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {  Menu } from '@mui/material';
import userImage from '../img/user.png';

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
  const isLoggedIn = Boolean(userInfo.name); // 检查是否登录

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => { navigate("/root/campaign") }}>
                筹款活动
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => { navigate("/root/launch") }}>
                发起筹款
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => { navigate("/root/campaign") }}>
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
    >
      {isLoggedIn ? (
        <>
          <img src={userImage} alt="描述文字" style={{ width: '80%', height: 'auto' }} />
          <Button onClick={handleMenuOpen} size="small" >
            
            <Typography variant="body1" sx={{ color: 'darkblue' }}>
              {userInfo.name || '未填写姓名'}
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
            <MenuItem onClick={handleMenuClose}>个人主页</MenuItem>
            <MenuItem onClick={handleLogout}>退出登录</MenuItem>
          </Menu>
        </>
      )
 : (
        <>
          <Button color="primary" variant="text" size="small" onClick={handleSignInClick}>
            登录
          </Button>
          <Button color="primary" variant="contained" size="small" onClick={handleSignUpClick}>
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
