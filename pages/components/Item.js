import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';




export default function Item(item, props) {
    const { user,
        currentpage,
        setCurrentpage,
        test,
        labledData} = props
  return (
  
  
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={item?.item?.name}
        height="270"
        image={"/images/" + item.item.imageName}
        onClick={(e)=>{console.log(e)}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.item?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={(e) => {
            console.log(e)
        }}>
            <AddIcon/>
        </IconButton>
        <IconButton onClick={(e) => {
            
        }}>
            <RemoveIcon/>
        </IconButton>
        <Typography variant="body1" color="text.primary">
          {item?.item?.price}
        </Typography>
      </CardActions>
    </Card>
  );
}