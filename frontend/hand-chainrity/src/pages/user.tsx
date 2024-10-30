import AppAppBar from '../component/AppAppBar';
import React, { useState } from 'react';
import { CampaignType } from '../types/interfaces';
import { fetchUserCampaigns } from '../actions/campaign';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../types/interfaces';
import { Card, CardContent, Typography, Box ,Container, CssBaseline, Divider, List, ListItem, ListItemButton, ListItemText, CardMedia,  styled, Avatar, AvatarGroup} from '@mui/material';
import Grid from '@mui/material/Grid2';
import '../styles/user.css';  // 确保路径正确



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
  // const address = localStorage.getItem('account') || null;
  // const name = localStorage.getItem('name') || null;
  // const email = localStorage.getItem('email') || null;

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const fetchCampaigns = async () => {
    fetchUserCampaigns(userInfo.address, setCampaigns);
  }

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
    <div>
    <CssBaseline enableColorScheme />
    {/* <Container
          maxWidth="lg"
          component="main"
          
          sx={{ display: 'fixed', flexDirection: 'column', my: 16, gap: 4 }}
        > */}
          
    <div id="user">
    
      <div className="user-info">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <AppAppBar />
        <h1>User Profile</h1>
        <p><strong>区块链地址:</strong> {userInfo.address}</p>
        <p><strong>姓名:</strong> {userInfo.name}</p>
        <p><strong>邮箱:</strong> {userInfo.email}</p>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List sx={{ fontSize: '1.2rem', padding: '10px 20px' }}>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemText primary="我参加的募捐" sx={{ fontSize: '2rem', padding: '10px 20px' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="我发起的募捐" sx={{ fontSize: '2rem', padding: '10px 20px' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="申请成为收益人" sx={{ fontSize: '2rem', padding: '10px 20px' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      </div>
      <div className="card">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">Participated Campaigns</Typography>
            <button onClick={fetchCampaigns}>Load Campaigns</button>
            {/* <ul>
              {campaigns.map((campaign) => (
                <li key={campaign.id}>
                  <h2>{campaign.title}</h2>
                  <p>{campaign.description}</p>
                  <p>{campaign.details}</p>
                  <p><strong>Target:</strong> {campaign.target} ETH</p>
                  <p><strong>Current:</strong> {campaign.current} ETH</p>
                  <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
                  <p><strong>Beneficiary:</strong> {campaign.beneficiary}</p>
                  <p><strong>Launcher:</strong> {campaign.launcher}</p>
                  <p><strong>Status:</strong> {campaign.status}</p>
                </li>
              ))}
            </ul> */}
            <Grid container spacing={2} columns={12}>
            <Grid  size={{ xs: 12, md: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
    {/* </Container> */}
    </div>
  );
}
function setFocusedCardIndex(arg0: null) {
  throw new Error('Function not implemented.');
}

