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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Outlet, NavLink } from 'react-router-dom';
// import Footer from './Footer';
import EventIcon from '@mui/icons-material/Event';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useMediaQuery } from '@mui/material';
const drawerWidth = 240;


// const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.down('sm')]: {
    width: '95%',
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
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('sm')]: {
          display:'none'
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
            Assets Management
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
            <StyledNavLink to="/">
              <ListItemButton
                sx={[{
                  minHeight: 48,
                  px: 2.5,
                },
                open ? { justifyContent: 'initial', } : { justifyContent: 'center', },
                ]} >
                <ListItemIcon
                  sx={[{
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open ? { mr: 3, } : { mr: 'auto', },]} >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  sx={[open ? {opacity: 1,}
                      : {opacity: 0, },
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/demo">
              <ListItemButton
                sx={[ {  minHeight: 48,
                    px: 2.5,},
                  open ? {justifyContent: 'initial', }: {justifyContent: 'center',},
                ]} >
                <ListItemIcon
                  sx={[{
                      minWidth: 0,
                      justifyContent: 'center', },
                    open? { mr: 3, } : { mr: 'auto', },
                  ]}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Events"
                  sx={[
                    open ? {  opacity: 1, }: { opacity: 0,},
                  ]} />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="assets-register">
              <ListItemButton
                sx={[{
                    minHeight: 48,
                    px: 2.5,  },
                  open ? { justifyContent: 'initial',  }  : {  justifyContent: 'center',  },

                ]} >
                <ListItemIcon
                  sx={[   {
                      minWidth: 0,
                      justifyContent: 'center', },
                    open  ? {   mr: 3,  }  : { mr: 'auto',  },
                  ]}  >
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="home"
                  sx={[open ? {  opacity: 1,  }: { opacity: 0,  },
                  ]}  />
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: theme.palette.background.default}}>
        <DrawerHeader />
        <Box sx={{display:{xs:open ? 'none' : 'block',md:'block'}}}>
        <Outlet />
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}