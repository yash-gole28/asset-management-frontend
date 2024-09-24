import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import l from './../assets/logo2.png'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;


// const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.down('sm')]: {
    width: 50,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.down('sm')]: {
    width: 0,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 0px 0px #fff',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('sm')]: {
          width: `calc(100% - ${50}px)`
        },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      backgroundColor: theme.palette.background.default,
      boxSizing: 'border-box',
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active': {
    color: theme.palette.secondary.dark,
  },
}));

export default function PersistentDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img className='logo' src={l} alt="" />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink className='active-tab' to="/">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },
                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },]} >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  sx={[open ? { opacity: 1, }
                    : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/profile">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },
                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },]} >
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={[open ? { opacity: 1, }
                    : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/assets-request">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },
                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },
                  ]}>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Assets Requests"
                  sx={[
                    open ? { opacity: 1, } : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/assets">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },

                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },
                  ]}  >
                  <InventoryIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Assets"
                  sx={[open ? { opacity: 1, } : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },

                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },
                  ]}  >
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={[open ? { opacity: 1, } : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/login">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: { xs: 1.5, sm: 2.5, md: 2.5 },
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },

                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },
                  ]}  >
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={[open ? { opacity: 1, } : { opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'rgb(242, 244, 247)', minHeight: '100vw',overflow:'hidden' }}>
        <DrawerHeader />
          <Outlet />
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}