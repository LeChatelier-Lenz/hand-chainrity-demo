import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchCampaigns, fetchFundraisingCampaigns } from '../../../actions/campaign';
import { CampaignType } from '../../../types/interfaces';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


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

// 定义一个格式化函数，用于截断名字
const formatLauncherName = (name: string) => {
  if (name.length <= 8) return name; // 如果名字长度小于等于 7，则不需要截断
  return `${name.slice(0, 5)}...${name.slice(-3)}`; // 取前三位和最后四位，中间加省略号
};

function Author({ authors }: { authors: { name: string; avatar: string; date: Date }[] }) {
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
          {authors.map((author) => formatLauncherName(author.name)).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">Deadline:{authors[0].date.toISOString().split("T")[0]}</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}


export default function MainContent() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([{// 用于存储筛选后的 campaign
    id: 0,
    title: "默认",
    description: "默认",
    details: "默认",
    target: 100,
    current: 0,
    createdAt: new Date(),
    deadline: new Date(),
    beneficiary: "默认",
    launcher: "默认",
    status: "默认",
    tag:"Donation-based Crowdfunding"
  }]); // Campaign[] is an array of Campaign objects
  

  // 原始 campaigns 数据状态
  const [allCampaigns, setAllCampaigns] = useState<CampaignType[]>([]); // 用于存储所有的 campaign
  const [load, setLoad] = React.useState(true);
  const navigate = useNavigate(); // 初始化导航钩子


  // 模拟 fetchCampaigns 的数据获取
  useEffect(() => {
    fetchFundraisingCampaigns((fetchedCampaigns: CampaignType[]) => {
      // 给每个 campaign 添加一个默认 tag
      const taggedCampaigns = fetchedCampaigns.map((campaign) => ({
        ...campaign,
        tag: "Donation-based Crowdfunding",
      }));
      // 设置获取到的所有 campaign 和默认显示的 campaign
      setAllCampaigns(taggedCampaigns);
      setCampaigns(taggedCampaigns);
      // 延迟 700 毫秒再执行 setLoad(false)
      setTimeout(() => {
        setLoad(false);
      }, 1000);
      });
  }, []);


  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  // 处理点击 Chip 的逻辑
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const selectedLabel = (event.target as HTMLElement).innerText;

    if (selectedLabel === "All categories") {
      // 显示所有 campaign
      setCampaigns(allCampaigns);
    } else {
      // 根据 tag 进行筛选
      setCampaigns(
        allCampaigns.filter((campaign) => campaign.tag === selectedLabel)
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Typography variant="h1" gutterBottom>
          Hostest Crowdfunding
        </Typography>
        <Typography>Take a look at the latest crowdfunding</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 0,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 0,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Reward-based Crowdfundin"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Equity-based Crowdfunding"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Debt-based Crowdfunding"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Donation-based Crowdfunding"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {campaigns.length >= 1 && <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            onClick={() => {navigate("/root/details/" + campaigns[focusedCardIndex!].id)}}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={'https://picsum.photos/800/450?random=1'}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {campaigns[0].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {campaigns[0].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {campaigns[0].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={[{ name: campaigns[0].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[0].createdAt }]} />
          </SyledCard>
        </Grid>}
        {campaigns.length < 1 && "There have not been any crowdfunding projects in this category"} 
        {campaigns.length >= 2 && (<Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            onClick={() => {navigate("/root/campaign/details/" + campaigns[focusedCardIndex!].id)}}
            tabIndex={0}
            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={'https://picsum.photos/800/450?random=2'}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {campaigns[1].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {campaigns[1].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {campaigns[1].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={[{ name: campaigns[1].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[1].createdAt }]} />
          </SyledCard>
        </Grid>)}
        {campaigns.length >= 3 && <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            onClick={() => {navigate("/root/campaign/details/" + campaigns[focusedCardIndex!].id)}}
            tabIndex={0}
            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={'https://picsum.photos/800/450?random=3'}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {campaigns[2].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {campaigns[2].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {campaigns[2].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={[{ name: campaigns[2].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[2].createdAt }]} />
          </SyledCard>
        </Grid>}
        {campaigns.length >= 5 && <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              onClick={() => {navigate("/root/campaign/details/" + campaigns[focusedCardIndex!].id)}}
              tabIndex={0}
              className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {campaigns[3].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {campaigns[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {campaigns[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={[{ name: campaigns[3].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[3].createdAt }]} />
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              onClick={() => {navigate("/root/campaign/details/" + campaigns[focusedCardIndex!].id)}}
              tabIndex={0}
              className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {campaigns[4].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {campaigns[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {campaigns[4].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={[{ name: campaigns[4].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[4].createdAt }]} />
            </SyledCard>
          </Box>
        </Grid>}
        {campaigns.length >= 6 && <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            onClick={() => {navigate("/root/campaign/details/" + campaigns[focusedCardIndex!].id)}}
            tabIndex={0}
            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={'https://picsum.photos/800/450?random=4'}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {campaigns[5].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {campaigns[5].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {campaigns[5].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={[{ name: campaigns[5].launcher, avatar: '/static/images/avatar/1.jpg', date: campaigns[5].createdAt }]} />
          </SyledCard>
        </Grid>}
      </Grid>
    </Box>
  );
}
