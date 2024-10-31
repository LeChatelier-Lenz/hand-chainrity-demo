import AppAppBar from '../component/AppAppBar';
import React, { useState } from 'react';
import { CampaignType } from '../types/interfaces';
import { fetchUserCampaigns } from '../actions/campaign';
import { Card, CardContent, Typography, Box ,Container, CssBaseline, Divider, List, ListItem, ListItemButton, ListItemText, CardMedia,  styled, Avatar, AvatarGroup, Button, Paper, TextField, Tooltip, AppBar} from '@mui/material';
import Grid from '@mui/material/Grid2';
import '../styles/user.css';  // 确保路径正确
import Application from '../component/application';
import Applications from '../component/applications';


const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export default function User() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  const [selectedIndex, setSelectedIndex] = useState("我参加的筹款活动");
  const [btnlist, setBtnlist] = useState(userInfo.role === 'admin' ? ["我参加的筹款活动", "我发起的筹款活动", '管理申请'] :(userInfo.role === 'beneficiary' ? ['我参加的筹款活动', '我发起的筹款活动']:['我参加的筹款活动', '我发起的筹款活动',  "申请成为受益人"]) );
  // if (userInfo.role === 'admin') {
  //   setButlist(['我参加的筹款活动', '我发起的筹款活动',  '管理申请']);
  // }

 

  // const address = localStorage.getItem('account') || null;
  // const name = localStorage.getItem('name') || null;
  // const email = localStorage.getItem('email') || null;

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  
  React.useEffect(() => {
    if(selectedIndex === "我参加的筹款活动") {
      fetchUserCampaigns(userInfo.address, setCampaigns);
    } else if(selectedIndex === "我发起的筹款活动") {
      // fetchUserCampaigns(userInfo.address, setCampaigns, true);
      // 补充发起的筹款活动列表获取
      setCampaigns([]);
    }
  }, [userInfo, selectedIndex]);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  const cardData = [
    {
      img: 'https://picsum.photos/800/450?random=1',
      tag: 'Engineering',
      title: 'Revolutionizing software development with cutting-edge tools',
      description:
        'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
      authors: [
        { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
        { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      ],
    },
    {
      img: 'https://picsum.photos/800/450?random=2',
      tag: 'Product',
      title: 'Innovative product features that drive success',
      description:
        'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
      authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
    {
      img: 'https://picsum.photos/800/450?random=3',
      tag: 'Design',
      title: 'Designing for the future: trends and insights',
      description:
        'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
      authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
    },
    {
      img: 'https://picsum.photos/800/450?random=4',
      tag: 'Company',
      title: "Our company's journey: milestones and achievements",
      description:
        "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
      authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
    },
    {
      img: 'https://picsum.photos/800/450?random=45',
      tag: 'Engineering',
      title: 'Pioneering sustainable engineering solutions',
      description:
        "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
      authors: [
        { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
        { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
      ],
    },
    {
      img: 'https://picsum.photos/800/450?random=6',
      tag: 'Product',
      title: 'Maximizing efficiency with our latest product updates',
      description:
        'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
      authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
    },
  ];

  return (
    <Container
    maxWidth="lg"
    component="main"
    sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
  >
    <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 ,overflow:"auto",position:"relative"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' ,width:"30%",top:0}} position="sticky">
          <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 4 ,p:4,justifySelf:"start",maxWidth:"300px"}}>
            
            {/* <h1>User Profile</h1>
            <p><strong>区块链地址:</strong><br/> {userInfo.address}</p>
            <p><strong>姓名:</strong> {userInfo.username}</p>
            <p><strong>邮箱:</strong> {userInfo.email}</p> */}
            <Typography variant="h6">用户信息</Typography>
              <Tooltip title={userInfo.address} placement="top">
            <Typography sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}><strong>区块链地址 : </strong>{userInfo.address}</Typography>
              </Tooltip>
            <Typography><strong>姓名 : </strong> {userInfo.username}</Typography>
              <Tooltip title={userInfo.email} placement="top">
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            ><strong>邮箱 : </strong> {userInfo.email}</Typography>
            </Tooltip>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                  <List>
                    {btnlist.map((text, index) => (
                      <ListItem disablePadding key={text}>
                        <ListItemButton onClick={() => setSelectedIndex(text)}>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
            </nav>
          </Paper>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width:"70%" ,justifySelf:"start",alignItems:"center"}}>
          <Card variant="outlined">
            <CardContent>
              {selectedIndex === "我参加的筹款活动" || selectedIndex === "我发起的筹款活动" ? (
              
              <Grid container columns={12} size={{xs:12,md:12}} >
                { campaigns.length === 0 ? (
                  <Typography variant="h6">您的列表目前为空</Typography>
                ) : (
              <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
              <Grid container spacing={2} columns={12}>
                  {campaigns.map((item, index) => (
                      <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <SyledCard
                          variant="outlined"
                          onFocus={() => handleFocus(0)}
                          onBlur={handleBlur}
                          tabIndex={0}
                          className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                        >
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            image={"https://picsum.photos/800/450?random=6"}
                            aspect-ratio="16 / 9"
                            sx={{
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                            }}
                          />
                          <SyledCardContent>

                            <Typography gutterBottom variant="h6" component="div">
                              {campaigns[index].title}
                            </Typography>
                            <Typography gutterBottom variant="caption" component="div">
                            {campaigns[index].description}
                          </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                              {campaigns[index].details}
                            </StyledTypography>
                          </SyledCardContent>
                          <Author authors={
                            [
                              {
                                name:campaigns[index].beneficiary,
                                avatar:"/static/images/avatar/2.jpg"}
                            ]} />
                        </SyledCard>
                      </Grid>

                  ))}
              </Grid>
              </List>
                )}
              {/* <Grid size={{ xs: 12, md: 6 }}>
                <SyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(0)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={cardData[0].img}
                    aspect-ratio="16 / 9"
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <SyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">
                      {cardData[0].tag}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {cardData[0].title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                      {cardData[0].description}
                    </StyledTypography>
                  </SyledCardContent>
                  <Author authors={cardData[0].authors} />
                </SyledCard>
              </Grid> */}
              
              </Grid>

              ) : (
                selectedIndex === "申请成为受益人" ? (<Application />) : (<Applications />)
              )}
            </CardContent>
          </Card>
        </Box>
        
      </Box>
    </Container>
  );
}
function setFocusedCardIndex(arg0: null) {
  throw new Error('Function not implemented.');
}

