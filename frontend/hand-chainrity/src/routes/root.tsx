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

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'donate crowdfunding',
    title: 'Donate Crowdfunding',
    icon: <MonetizationOnOutlinedIcon />,
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    segment: 'start crowdfunding',
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
        segment: 'your followed crowdfunding',
        title: 'Your Followed Crowdfunding',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'your created crowdfunding',
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
  colorSchemes: { light: true, dark: true},
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
  const renderComponent = () => {
    switch (pathname) {
      case '/dashboard/donate crowdfunding':
        return <Campaign />;
      case '/dashboard/start crowdfunding':
        return <Launch customProp="Value you want to pass" />;
      case '/dashboard/user':
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
