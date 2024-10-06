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
import { Outlet, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import l from './../assets/logo2.png'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { MyContext } from '../Context/AuthContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CategoryIcon from '@mui/icons-material/Category';

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
  const [open, setOpen] = React.useState(true);

  const context = React.useContext(MyContext);
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const { type, username } = context;
  const isNotEmployee = type !== 'employee' || type === undefined
  const isAdmin = type === 'admin'
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // React.useEffect(()=>{
  //   getCurrentUser()
  // },[])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              <MenuIcon sx={{ fontSize: '18px' }} />
            </IconButton>
            <Box>
              <Typography sx={{ ...(open ? { display: 'none' } : { diaplay: 'block' }) }} noWrap component="div">
                <img className='logo' src={l} alt="" />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/profile" className='profile-link'>
              <PersonIcon sx={{ backgroundColor: 'rgb(242, 244, 247)', padding: '.4rem', mr: '.5rem', borderRadius: '50%', fontSize: '35px', color: 'rgb(160, 158, 158)' }} />
            </NavLink>
           <Box sx={{display:"flex", flexDirection:"column",justifyContent:"center",height:"100%"}}>
           <Typography sx={{ fontWeight: '600', color: '#495057' }}>
                {username}
              </Typography>
                <Typography sx={{fontSize:'10px'}}>{type}</Typography>
           </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ ...(open ? { display: 'block' } : { diaplay: 'none' }) }} noWrap component="div">
            <img className='logo' src={l} alt="" />
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List sx={[open ? {padding:{xs:'0rem',sm:'0rem',md:'1rem'}} :{ padding:'0rem'} ]}>
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
                  <HomeIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
               
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Home</Typography>
              </ListItemButton>
            </StyledNavLink>
                <Divider/>
          </ListItem>
          {isNotEmployee && <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/asset-requests">
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
                  <NoteAddIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
              
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Asset Requests</Typography>
              </ListItemButton>
            </StyledNavLink>
          <Divider/>
          </ListItem>}
          {isNotEmployee && <ListItem disablePadding sx={{ display: 'block' }}>
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
                  <InventoryIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
             
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Assets</Typography>
              </ListItemButton>
            </StyledNavLink>
          <Divider/>
          </ListItem>}
          {isAdmin && <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/register">
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
                  <PersonAddIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
              
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Users</Typography>
              </ListItemButton>
            </StyledNavLink>
          <Divider/>
          </ListItem>}
          {isAdmin && <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/category">
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
                  <CategoryIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
              
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Categories</Typography>
              </ListItemButton>
            </StyledNavLink>
          <Divider/>
          </ListItem>}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <StyledNavLink to="/setting">
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
                  <SettingsIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
             
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Settings</Typography>
              </ListItemButton>
            </StyledNavLink>
        <Divider/>
          </ListItem>
          <ListItem onClick={() => { localStorage.removeItem('token') }} disablePadding sx={{ display: 'block' }}>
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
                  <LogoutIcon sx={{ fontSize: '18px' }} />
                </ListItemIcon>
             
                <Typography sx={[open ? { opacity: 1, fontWeight: '600', fontSize: '14px' }
                  : { opacity: 0, display: 'none' },
                ]}>Logout</Typography>
              </ListItemButton>
            </StyledNavLink>
          </ListItem>
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'rgb(242, 244, 247)', overflow: 'hidden' }}>
        <DrawerHeader />
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </Box>
  );
}