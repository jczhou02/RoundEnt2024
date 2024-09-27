const express = require('express');
const cors = require('cors');  
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Implement CORS config
app.use(cors());

// Products array (with random image URLs for each product + ADDED CATEGORY property)
let products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: '' , even: false},
  { id: 2, name: 'Product 2', description: 'Description 2', price: 200, imageUrl: '' , even: true},
  { id: 3, name: 'Product 3', description: 'Description 3', price: 300, imageUrl: '' , even: false},
  { id: 4, name: 'Product 4', description: 'Description 4', price: 150, imageUrl: '' , even: true},
  { id: 5, name: 'Product 5', description: 'Description 5', price: 500, imageUrl: '' , even: false},
  { id: 6, name: 'Product 6', description: 'Description 6', price: 50, imageUrl: '' , even: true}
];

// Function to generate a random image URL from picsum
const fetchImageUrl = () => {
  return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// Assign random image URLs to products on server start
products = products.map(product => ({
  ...product,
  imageUrl: fetchImageUrl()
}));

// GET API for fetching all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// DELETE API for deleting a product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(product => product.id == id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
