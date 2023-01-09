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




export default function Item(props) {
  const {
    item,
    user,
    currentpage,
    setCurrentpage,
    test,
    labledData } = props
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={item?.name}
        height="270"
        image={"/images/" + item?.imageName}
        onClick={(e) => { console.log(e) }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={(e) => {
          user.send({ function: "addToCart", data: { mode: "+", itemId: item?.id } })
        }}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={(e) => {
          user.send({ function: "addToCart", data: { mode: "-", itemId: item?.id } })
        }}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" color="text.primary">
          {item.q ? String(item?.price) + "$" + " X " + String(item.q) : String(item?.price) + "$"}
        </Typography>
      </CardActions>
    </Card>
  );
}