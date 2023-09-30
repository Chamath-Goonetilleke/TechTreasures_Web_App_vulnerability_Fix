import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './itemGrid.css'

const SingleItem = () => {
    return (
        <div className='gridStyling'>
            
        <Card className='cardStyling'>
      <CardMedia
        sx={{ height: 140 }}
        image="https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </div>
    );
}

export default SingleItem;
