import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchCampaigns } from '../../../actions/campaign';
import { CampaignType } from '../../../types/interfaces';

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

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

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

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

  // 模拟 fetchCampaigns 的数据获取
  useEffect(() => {
    fetchCampaigns((fetchedCampaigns: CampaignType[]) => {
      // 给每个 campaign 添加一个默认 tag
      const taggedCampaigns = fetchedCampaigns.map((campaign) => ({
        ...campaign,
        tag: "Donation-based Crowdfunding",
      }));
      // 设置获取到的所有 campaign 和默认显示的 campaign
      setAllCampaigns(taggedCampaigns);
      setCampaigns(taggedCampaigns);
    });
  }, []);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {campaigns.map((campaign, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {formatLauncherName(campaigns[0].launcher)}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {campaign.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {campaign.description}
              </StyledTypography>

              <Author authors={[{ name: campaign.launcher, avatar: '/static/images/avatar/1.jpg', date: campaign.createdAt }]} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
      </Box>
    </div>
  );
}
