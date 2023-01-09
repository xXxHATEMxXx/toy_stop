import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ShopView from './shopView';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AllOutSharp, CardTravel } from '@mui/icons-material';
import SignInDialog from './signInDialog';
import ShoppingCartDialog from './shoppingCartDialog';
import SignUpDialog from './signUpDialog';
import { SnackbarProvider, useSnackbar } from 'notistack';

export const nbaTeams = [
  { id: 1, name: '10' },
  { id: 2, name: '20' },
  { id: 3, name: '30' },
  { id: 4, name: '40' },
  { id: 5, name: '50' },
  { id: 6, name: '60' },
  { id: 7, name: '100' },
  { id: 8, name: '150' },
  { id: 9, name: '200' },
  { id: 10, name: '300' },
  { id: 10, name: '400' },
];

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
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

class User {
  constructor(addSnackBar, handleServerResponse, forceRender) {
    this.addSnackBar = addSnackBar
    this.handleServerResponse = handleServerResponse
    this.forceRender = forceRender
    this.isConnected = false
    this.isSignedIn = false
    this.isTryingToConnect = false
    this.socket = null
    this.isDataLoaded = false
    this.firstName = "Guest"
    this.lastName = ""
    this.username = ""
    this.cart = {0:0}

  }

  handleConntion() {
    if (!this.isConnected && !this.isTryingToConnect) {
      this.addSnackBar("Trying To Connect...", "info")
      this.isTryingToConnect = true
      this.forceRender()
      try {
        this.socket = new WebSocket('ws://179.61.219.171:7000')
        this.socket.onopen = (e) => {
          //console.log(e.eventPhase == e.BUBBLING_PHASE)
          //console.log("[open] Connection established");
          //console.log("Sending to server");
          this.isTryingToConnect = false
          this.forceRender()
          this.handleConnected()


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
          //this.addSnackBar(`[error] ${error.message}`);
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
        this.addSnackBar(e)
        this.isTryingToConnect = false
        this.forceRender()
        if (this.isConnected) {
          this.handleConnectionError()
        } else {
          this.handleUnableToConnect()
        }

      }

    } else {
      this.addSnackBar("Already Connected", "success")
      this.forceRender()
    }
  }

  handleConnected() {
    this.addSnackBar("Connected", "success")
    this.isConnected = true
    this.forceRender()
  }

  handleDisconnected(clean) {
    if (clean) {
      this.addSnackBar("Disconnected", "warning")
      this.isConnected = false
      this.forceRender()
      this.handleSignOut()
    } else {
      this.addSnackBar("Disconnected", "error")
      this.isConnected = false
      this.forceRender()
      this.handleSignOut()
    }
  }

  handleUnableToConnect() {
    this.addSnackBar("Unable To Connect", "error")
    this.isConnected = false
    this.forceRender()
    this.handleSignOut()
  }

  handleConnectionError() {
    this.addSnackBar("Connection Error", "error")
    this.isConnected = false
    this.forceRender()
    this.handleSignOut()
  }

  handleSignUp() {
    if (!this.isConnected) {
      this.connect()
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
    this.forceRender()
  }

  onSignUp(serverResponse) {
    if (serverResponse.status === true) {
      this.addSnackBar("Signed Up successfully", "success")
    } else {
      this.addSnackBar("Fiald To Sign Up", "error")
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
      this.addSnackBar("Signed In Successfully", "success")
      setSignIn(this.defaultData.input.signIn)
    } else {
      this.addSnackBar(response.data.message, "error")
    }
  }

  handleSignOut() {
    if (this.isSignedIn) {
      this.isSignedIn = false
      this.socket.send(JSON.stringify({ function: "signOut", data: {} }))
      this.addSnackBar("Signed Out", "warning")
    }
  }

  onSignOut() {
    this.socket.send(JSON.stringify({ function: "signOut", data: {} }))
    console.log(this.user)
    this.addSnackBar("Signed Out", "warning")
  }

  connect() {
    if (!this.isTryingToConnect) {
      this.handleConntion()
    }
    else {
      this.addSnackBar("Already Trying To Connect", "info")
    }
  }

  send(data) {
    if (this.isConnected) {
      this.socket.send(JSON.stringify(data))
    } else {
      if (!this.isTryingToConnect) {
        this.connect()
      }
    }
  }
}

const mdTheme = createTheme();

export default function Home(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentpage, setCurrentpage] = useState("Home")
  const [allData, setAllData] = useState([{ id: 0, name: "", imageName: "", description: "", price: 0, q:0 }])
  const [labledData, setLabledData] = useState([{ id: 0, name: "", imageName: "", description: "", price: 0, q:0 }])
  const [listOfTypes, setListOfTypes] = useState([])
  const [renderForce, setRenderForce] = useState(false)
  const [openSignInDialog, setOpenSignInDialog] = useState(false)
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const [openShoppingCartDialog, setOpenShoppingCartDialog] = useState(false)
  const providerRef = React.useRef();

    const addSnackBar = (msg, variant) => {
        providerRef.current.enqueueSnackbar(msg, {
            variant: variant,
          });
    }
  const forceRender = () => {
    setRenderForce(!renderForce)
    console.log(renderForce)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleServerResponse = (serverResponse) => {
    console.log(serverResponse)
    switch (serverResponse.function) {

      case "onSignIn":
        if (serverResponse.data.status == 0) {
          user.isSignedIn = true
          user.firstName = serverResponse.data.firstName
          user.lastName = serverResponse.data.lastName
          user.username = serverResponse.data.user
          user.cart = serverResponse.data.shoppingCart
          addSnackBar("Signed in as " + serverResponse.data.user, "success")
          setOpenSignInDialog(false)
          forceRender()
        }
        else if (serverResponse.data.status == 1) {
          addSnackBar("Wrong Password", "error")
          forceRender()
        }
        else if (serverResponse.data.status == 2) {
          addSnackBar("Wrong Username", "error")
          forceRender()
        }
        break;
      case "onGetAllData":
        {setAllData(serverResponse.data.allData)
        setLabledData(serverResponse.data.allData)
        let list = {}
        serverResponse.data.allData.map(item => {
          list[item.type] = false
        })
        setListOfTypes(list)
        forceRender()}
        break;
      case "onSignUp":
        if (serverResponse.data.status == "0") {
          setOpenSignUpDialog(false)
          setOpenSignInDialog(true)
        }else{

        }
        break;
      case "onAddToShoppingCart":
        if (serverResponse.data.status == "5"){
          addSnackBar("This Item is not in cart", "error")
          forceRender()
        } else {
          addSnackBar("Operation Success", "success")
          user.cart = serverResponse.data.newCart
          forceRender()
        }
        break;

      default:
      // code block
    }
  }
  function filterSearch(value) {
    const results = allData.filter((item) => {
      return (item?.name.toLowerCase().includes(value.toLowerCase()));
    });
    return results
  }
  const test = () => {
  }
  const [user, setUser] = useState(new User(addSnackBar, handleServerResponse, forceRender))
  const mainProps = {
    user,
    currentpage,
    setCurrentpage,
    test,
    labledData,
  }

  const MINUTE_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      // user.send({function:"ping", data:{message:""}})
      if (user.isConnected) {
        if (!user.isDataLoaded) {
          user.send({ function: "getAllData", data: {} })
          user.isDataLoaded = true
        }
      }

    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  return (
    <SnackbarProvider ref={providerRef} maxSnack={2} preventDuplicate>
    <ThemeProvider theme={mdTheme}>
        
      <SignInDialog 
        openSignInDialog = {openSignInDialog}
        setOpenSignInDialog = {setOpenSignInDialog}
        openSignUpDialog = {openSignUpDialog}
        setOpenSignUpDialog = {setOpenSignUpDialog} {...mainProps} />
      <SignUpDialog 
        openSignInDialog = {openSignInDialog}
        setOpenSignInDialog = {setOpenSignInDialog}
        openSignUpDialog = {openSignUpDialog}
        setOpenSignUpDialog = {setOpenSignUpDialog} {...mainProps} />
        <ShoppingCartDialog openShoppingCartDialog={openShoppingCartDialog}
        setOpenShoppingCartDialog={setOpenShoppingCartDialog} {...mainProps} />
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
            <Autocomplete
              disablePortal
              sx={{ width: 400, bgcolor: 'white', m: 0.5, borderColor: "#e57627" }}
              options={allData}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => {
                return (
                  <Box component="li" {...props}>
                    {option.name}
                  </Box>
                )
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search"
                  fullWidth
                  onChange={(e) => {
                    setLabledData(allData.filter((item) => { return (item?.name.toLowerCase().includes(e.target.value.toLowerCase())) }))
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={(e, value) => {
                try {

                } catch (exception_var) {
                }
              }}
            />
            <IconButton color="inherit" onClick={() => { user.connect(); }}>
              <SettingsInputAntennaIcon sx={{ color: user.isConnected ? "#3ba55d" : user.isTryingToConnect ? "#eea01a" : "#ed4245" }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => {
              if (!user.isSignedIn) {
                setOpenSignInDialog(true)
              }
              else {
                setOpenShoppingCartDialog(true)
              }
            }}>
              <ShoppingCartIcon sx={{ color: user.isSignedIn ? "#3ba55d" : "#ed4245" }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => {
              if (!user.isSignedIn) {
                setOpenSignInDialog(true)
              }
              else {
                addSnackBar("Already Signed In", "info")
              }
            }}>
              <AccountCircleIcon sx={{ color: user.isSignedIn ? "#3ba55d" : "#ed4245" }} />
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
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={user.firstName} />
          </ListItemButton>
          <Divider />
            <ListSubheader component="div" inset>
              Filler Type
            </ListSubheader>
            {user.isDataLoaded && Object.keys(listOfTypes).map((item, index) => {
              return (
                <FormControlLabel
                  value="end"
                  key={index}
                  control={<Checkbox key={index} onChange={e => {
                    let list = listOfTypes
                    list[item] = e.target.checked
                    setListOfTypes(list)
                    if (Object.values(list).every(element => element === false)) {
                      setLabledData(allData)
                    } else (
                      setLabledData(allData.filter((item) => { return (list[item?.type]) }))
                    )
                  }} />}
                  label={item}
                  labelPlacement="end"
                  sx={{
                    ml: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                  }}

                />

              )
            })

            }

            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
              Sort By Price
            </ListSubheader>
            <FormControl
            >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={e => {
                  if (e.target.value == "htl") {
                    setLabledData(labledData.sort((b, a) => { return a.price > b.price ? 1 : b.price > a.price ? -1 : 0 }))
                  } else {
                    setLabledData(labledData.sort((a, b) => { return a.price > b.price ? 1 : b.price > a.price ? -1 : 0 }))
                  }
                  forceRender()
                }}
                sx={{
                  ml: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'left',
                }}
              >
                <FormControlLabel value="htl" control={<Radio />} label="high to low" />
                <FormControlLabel value="lth" control={<Radio />} label="low to high" />
              </RadioGroup>
            </FormControl>
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

          <ShopView {...mainProps} />
        </Box>
      </Box>
    </ThemeProvider>
    </SnackbarProvider>
  );
}
