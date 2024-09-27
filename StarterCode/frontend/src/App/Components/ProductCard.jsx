import React from 'react';
import { Card as MUICard, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onDelete }) => {
  return (
    <MUICard sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1">
          Price: ${product.price}
        </Typography>
        <IconButton onClick={() => onDelete(product.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </MUICard>
  );
};

export default ProductCard;
