import React, { useState } from 'react';
import ProductList from './App/Page/ProductList';
import CategorySidebar from './App/Components/CategorySidebar';  
import { Grid, Container } from '@mui/material';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');  // Manage selected category

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);  // Update the selected category when changed
  };

  return (
    <Container>
      <h1>Your Activities For Today</h1>

      <Grid container spacing={2}>
        {/* Sidebar faint arrow button top left corner!*/}
        <CategorySidebar onCategorySelect={handleCategorySelect} />

        {/* Right Column: Product List */}
        <Grid item xs={12} sm={12}>
          <ProductList selectedCategory={selectedCategory} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
