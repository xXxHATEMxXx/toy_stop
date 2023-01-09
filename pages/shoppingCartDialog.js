import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './signIn';
import ShoppingCart from './shoppingCart';
import ShopView from './shopView';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShoppingCartDialog(props) {
  const { 
    openShoppingCartDialog,
    setOpenShoppingCartDialog,
    user,
    currentpage,
    setCurrentpage,
    test,
    labledData,
     } = props

  const handleCloseShoppingCartDialog = () => {
    setOpenShoppingCartDialog(false)

  }
  return (
    <Dialog
      fullScreen
      open={openShoppingCartDialog}
      onClose={handleCloseShoppingCartDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseShoppingCartDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography dir="rtl" sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

          </Typography>
        </Toolbar>
      </AppBar>
      <ShoppingCart {...props} />

    </Dialog>
  );
}