import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import ProductCard from '../Components/ProductCard';  

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  // To store filtered products
  const [sortOption, setSortOption] = useState('lowest');  // Sorting Price state

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');  
      setProducts(response.data);
      setFilteredProducts(response.data);  // Initially show all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // DELETE 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);  // Backend route to delete product by ID
      setProducts(products.filter(product => product.id !== id));  // Update local state
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));  // Update filtered products
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // SORT
  const sortProducts = (productsToSort) => {
    if (sortOption === 'lowest') {
      return [...productsToSort].sort((a, b) => a.price - b.price);  //  LOW - HIGH
    }
    if (sortOption === 'highest') {
      return [...productsToSort].sort((a, b) => b.price - a.price);  // HIGH - LOW
    }
    return productsToSort;  // Return unsorted if no valid option
  };

  // HANDLE SORT
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // CATEGORY effect
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);  // Show all products if 'all' is selected
    } else if (selectedCategory === 'even') {
      setFilteredProducts(products.filter(product => product.even === true));
    } else if (selectedCategory === 'odd') {
      setFilteredProducts(products.filter(product => product.even === false));
    }
  }, [selectedCategory, products]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOption}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="lowest">Price: Lowest - Highest</MenuItem>
          <MenuItem value="highest">Price: Highest - Lowest</MenuItem>
        </Select>
      </FormControl>

      {/* Product Cards */}
      <Grid container spacing={2} justifyContent="center">
        {sortProducts(filteredProducts).map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onDelete={() => handleDelete(product.id)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
