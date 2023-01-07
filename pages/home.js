import * as React from 'react';
import { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputIcon from '@mui/icons-material/Input';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { saveAs } from 'file-saver';

import ShopView from './shopView';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
const drawerWidth = 240;

ingify(jsonObject)], {type : 'application/json'});
saveAs(blob, 'abc.json');

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

class User {
  constructor(handleServerResponse, forceRender) {
    this.handleServerResponse = handleServerResponse
    this.forceRender = forceRender
    this.isConnected = false
    this.isSignedIn = false
    this.isTryingToConnect = false
    this.socket = null

  }

  handleConntion() {
    if (!this.isConnected && !this.isTryingToConnect) {
      this.isTryingToConnect = true
      this.forceRender()
      try {
        this.socket = new WebSocket('ws://127.0.0.1:7000')
        this.socket.onopen = (e) => {
          //console.log(e.eventPhase == e.BUBBLING_PHASE)
          //console.log("[open] Connection established");
          //console.log("Sending to server");
          this.isTryingToConnect = false
          this.handleConnected()
          this.forceRender()

        };

        this.socket.onmessage = (event) => {
          //console.log(event.data)
          try {
            let response = JSON.parse(event.data)
            //console.log(`[message] Data received from server: ${event.data}`);
            this.handleServerResponse(response)
          } catch {
            //console.log("can't handle message")
            //console.log(event.data)
          }
          this.forceRender()
        };

        this.socket.onclose = (event) => {
          if (this.isConnected) {
            if (event.wasClean) {
              this.handleDisconnected(true)
              //console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
              this.handleDisconnected(false)
              // e.g. server process killed or network down
              // event.code is usually 1006 in this case
              // console.log('[close] Connection died');
            }
          }
          console.log("socket closed")
          this.isTryingToConnect = false
          this.forceRender()
        };
        this.socket.onerror = (error) => {
          if (this.isConnected) {
            this.handleConnectionError()
          } else {
            this.handleUnableToConnect()
          }
          console.log("connection error")
          this.isTryingToConnect = false
          this.forceRender()
        };
      } catch (e) {
        this.isTryingToConnect = false
        if (this.isConnected) {
          this.handleConnectionError()
        } else {
          this.handleUnableToConnect()
        }
        this.forceRender()
      }

    } else {
      this.forceRender()
    }
  }

  handleConnected() {
    this.isConnected = true
  }

  handleDisconnected(clean) {
    if (clean) {
      this.isConnected = false
      this.handleSignOut()
    } else {
      this.isConnected = false
      this.handleSignOut()
    }
  }

  handleUnableToConnect() {
    this.isConnected = false
    this.handleSignOut()
  }

  handleConnectionError() {
    this.isConnected = false
    this.handleSignOut()
  }

  handleSignUp() {
    if (!this.isConnected) {
      this.this.connect()
    }
    if (signUp.data.password !== signUp.data.confirmPassword) {
      setSignUp(signUp => ({
        ...signUp,
        alerts: {
          ...signUp.alerts,
          password: {
            status: true,
            message: "Both Passwords Are Not The Same",
            variant: "error"
          },
          confirmPassword: {
            status: true,
            message: "Both Passwords Are Not The Same",
            variant: "error"
          }
        }
      }))
    }
    if (validateEmail(signUp.data.email) === null) {
      setSignUp(signUp => ({
        ...signUp,
        alerts: {
          ...signUp.alerts,
          email: {
            status: true,
            message: "Invalied Email",
            variant: "error"
          },
        }
      }))
    }
    if (signUp.data.username === "") {
      setSignUp(signUp => ({
        ...signUp,
        alerts: {
          ...signUp.alerts,
          username: {
            status: true,
            message: "Invalied username",
            variant: "error"
          },
        }
      }))
    }
    if (signUp.data.password === signUp.data.confirmPassword &&
      validateEmail(signUp.data.email) !== null &&
      signUp.data.username !== "") {
      this.socket.send(JSON.stringify({
        function: "signUp", data: {
          username: signUp.data.username,
          email: signUp.data.email,
          firstName: signUp.data.firstName,
          lastName: signUp.data.lastName,
          password: signUp.data.password
        }
      }));
    }
  }

  onSignUp(serverResponse) {
    if (serverResponse.status === true) {
    } else {
    }
  }

  handleSignIn() {
    if (this.isConnected && !this.isSignedIn) {
      this.socket.send(JSON.stringify({
        function: "signIn", data: {
          username: signIn.data.username,
          password: signIn.data.password
        }
      }));
    } else {
      this.connect()
    }
  }

  onSignIn(response) {
    if (response.status === true) {
      setSignIn(this.defaultData.input.signIn)
    } else {
    }
  }

  handleSignOut() {
    if (this.isSignedIn) {
      this.isSignedIn = false
      this.socket.send(JSON.stringify({ function: "signOut", data: {} }))
    }
  }

  onSignOut() {
    this.socket.send(JSON.stringify({ function: "signOut", data: {} }))
    console.log(this.user)
  }

  connect() {
    if (!this.isTryingToConnect) {
      this.handleConntion()
    }
    else {
    }
  }

  send(data) {
    if (this.isConnected) {
      this.socket.send(JSON.stringify(data))
    } else {
      if (!this.isTryingToConnect){
        this.connect()
      }  
    }
  }
}

const mdTheme = createTheme();

export default function Main() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [currentpage, setCurrentpage] = useState("Home")
  const [allData, setAllData] = useState([{id:0, name:"", imageName:"", description:"", price:0}])
  
  const jsonObject =  [
    {'id': 1,
    'name': 'Teddy Bear',
    'type': 'LotFancy',
    'discripsion': 'A cute teddy bear',
    'price': Decimal('14.99'),
    'imageName': 'teddy-bear.png'
    },
    {'id': 2,
    'name': 'Doll', 
    'type': 'Barbie', 
    'discripsion': 'A sweet doll', 
    'price': Decimal('9.48'), 
    'imageName': 'doll.png'
    },
    {'id': 3, 
    'name': 'Toy Car 1', 
    'type': 'Hot Wheels', 
    'discripsion': 'A cute datsun toy car', 
    'price': Decimal('57.14'), 
    'imageName': 'toy-car-1.png'
    },
    {'id': 4, 
    'name': 'Toy Car 2', 
    'type': 'Hot Wheels', 
    'discripsion': 'A cute ford toy truck', 
    'price': Decimal('39.99'), 
    'imageName': 'toy-car-2.png'
    },
    {'id': 5, 
    'name': 'Toy Car 3', 
    'type': 'Hot Wheels', 
    'discripsion': 'A cute mercedes toy racecar', 
    'price': Decimal('54.74'), 
    'imageName': 'toy-car-3.png'
    }, 
    {'id': 6, 'name': 'Lego Classics', 
    'type': 'Lego', 
    'discripsion': 'A cute lego monsters set', 
    'price': Decimal('9.97'), 
    'imageName': 'lego-monsters.png'
    },
    {'id': 7, 
    'name': 'Lego Dots', 
    'type': 'Lego', 
    'discripsion': 'A cute lego dots set', 
    'price': Decimal('17.94'), 
    'imageName': 'lego-dots.png'
    }, 
    {'id': 8, 
    'name': 'Sweet Jumperoo', 
    'type': 'Fisher-Price', 
    'discripsion': 'A sweet ride jumperoo', 
    'price': Decimal('124.99'), 
    'imageName': 'ride-jumperoo.png'
    }, 
    {'id': 9, 
    'name': 'Musical Keyboard', 
    'type': 'CoComelon', 
    'discripsion': 'A sweet musical keyboard', 
    'price': Decimal('26.99'), 
    'imageName': 'musical-keyboard.png'
    }, 
    {'id': 10, 
    'name': 'T-Shirt & Shorts Set 1', 
    'type': 'CoComelon', 
    'discripsion': 'A sweet t-shirt & shorts set', 
    'price': Decimal('18.99'), 
    'imageName': 'tshirt-shorts-1.png'
    }, 
    {'id': 11, 
    'name': 'T-Shirt & Shorts Set 2', 
    'type': 'CoComelon', 
    'discripsion': 'A sweet t-shirt & shorts set', 
    'price': Decimal('18.99'), 
    'imageName': 'tshirt-shorts-2.png'
    }, 
    {'id': 12, 
    'name': 'T-Shirt & Shorts Set 3', 
    'type': 'CoComelon', 
    'discripsion': 'A sweet t-shirt & shorts set', 
    'price': Decimal('18.99'), 
    'imageName': 'tshirt-shorts-3.png'
    }, 
    {'id': 13, 
    'name': 'N-Strike Blaster', 
    'type': 'Nerf', 
    'discripsion': 'A powerful blaster gun', 
    'price': Decimal('34.99'), 
    'imageName': 'strike-blaster.png'
    }, 
    {'id': 14, 
    'name': 'Baby Mickey Mouse', 
    'type': 'Disney', 
    'discripsion': 'A sweet baby Mickey plush', 
    'price': Decimal('18.88'), 
    'imageName': 'baby-mickey.png'
    }, 
    {'id': 15, 
    'name': 'Baby Minnie Mouse', 
    'type': 'Disney', 
    'discripsion': 'A sweet baby Minnie plush', 
    'price': Decimal('51.23'), 
    'imageName': 'baby-minnie.png'
    }, 
    {'id': 16, 
    'name': '3D Toddler Scooter', 
    'type': 'Bluey', 
    'discripsion': 'A fantastic 3-wheel scooter', 
    'price': Decimal('29.00'), 
    'imageName': 'toddler-scooter.png'
    }, 
    {'id': 17, 
    'name': 'Cottage Playhouse', 
    'type': 'Litte Tikes', 
    'discripsion': 'A fancy blue playhouse', 
    'price': Decimal('139.99'), 
    'imageName': 'cottage-playhouse.png'
    }, 
    {'id': 18, 
    'name': '2-in-1 Motor/Wood Shop', 
    'type': 'Little Tikes', 
    'discripsion': 'A realistic motor/wood shop', 
    'price': Decimal('99.00'), 
    'imageName': '2x1-motor-shop.png'
    }, 
    {'id': 19, 
    'name': 'UNO Collector Tin', 
    'type': 'UNO', 
    'discripsion': 'A premium quality uno set', 
    'price': Decimal('49.39'), 
    'imageName': 'uno-phase10-snappy.png'
    }, 
    {'id': 20, 
    'name': 'Razor MX350 Bike', 
    'type': 'Razor', 
    'discripsion': 'A powerful electric bike', 
    'price': Decimal('328.00'), 
    'imageName': 'mx350-bike.png'
    }
    ]
  
    const blob = new Blob([JSON.stringify(jsonObject)], {type : 'application/json'});
    saveAs(blob, 'abc.json');
    setDrawerOpen(!drawerOpen);
  };
  const handleServerResponse = (serverResponse) => {
    console.log(serverResponse)
    switch (serverResponse.function) {
      case "message":
        addSnackBar(serverResponse.data.message, serverResponse.data.variant)
        break;
      case "signUp":
        user.onSignUp(serverResponse)
        break;
      case "signIn":
        user.onSignIn(serverResponse)
        break;
      case "signOut":
        user.onSignOut()
        break;
      case "disconnect":
        user.handleDisconnected(true)
        break;
      case "onGetAllData":
        setAllData(serverResponse.data.allData)
        break;
      default:
      // code block
    }
  }

  const [renderForce, setRenderForce] = useState(false)
  const forceRender = () => {
    setRenderForce(!renderForce)
  }
  const [user, setUser] = useState(new User(handleServerResponse, forceRender))
  const test = () => {
    user.send({function:"getAllData", data:{}})
  }
  const mainProps = {
    user,
    currentpage,
    setCurrentpage,
    test,
    allData
  }

  const MINUTE_MS = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      // user.send({function:"ping", data:{message:""}})
      if (user.isConnected) {
          user.send({function:"getAllData", data:{}})
      }

    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={drawerOpen}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              bgcolor: "#202225",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{

                marginRight: '36px',
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {currentpage}
            </Typography>
            <IconButton color="inherit" onClick={() => { user.connect(); }}>
              <SettingsInputAntennaIcon sx={{ color: user.isConnected ? "#3ba55d" : user.isTryingToConnect ? "#eea01a" : "#ed4245" }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => { test() }}>
              <SettingsInputAntennaIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawerOpen}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <ShopView {...mainProps}/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
