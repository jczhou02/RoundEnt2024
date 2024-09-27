import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import ProductCard from '../Components/ProductCard';  // Make sure this path is correct

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');  // Update this to your correct backend URL if necessary
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Delete product by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);  // Backend route to delete product by ID
      setProducts(products.filter(product => product.id !== id));  // Update local state
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);  // Log the products array to verify it's populated
  }, [products]);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
