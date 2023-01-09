import * as React from 'react';
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
import { IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import Item from './components/Item';


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


export default function ShoppingCart(props) {

    const { 
        openShoppingCartDialog,
        setOpenShoppingCartDialog,
        user,
        currentpage,
        setCurrentpage,
        test,
        labledData, 
        } = props
  console.log()
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          {labledData && Object.keys(user.cart).map(itemId =>{
            console.log()
            let item = labledData.filter((item) => { return (item.id == itemId) })[0]
            item.q = user.cart[itemId]
          return(<Grid key={item} item xs={12} md={4} lg={3}>
              <Item item={item}  {...props}/>
          </Grid>)})}
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </>
  );
}

