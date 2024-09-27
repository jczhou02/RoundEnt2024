import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  

const CategorySidebar = ({ onCategorySelect }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);  // Control sidebar visibility

  const toggleSidebar = (open) => () => {
    setSidebarOpen(open);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    onCategorySelect(category);  // Send selected category to parent component
    setSidebarOpen(false);  // Close sidebar after selecting a category
  };

  return (
    <>
      <IconButton
        onClick={toggleSidebar(true)}
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          color: 'rgba(0, 0, 0, 0.5)',  // Faint color
          ':hover': {
            color: 'black',  // Darker color on hover
          }
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar (Drawer) */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar(false)}>
        <List>
          <ListItem ButtonBase onClick={() => handleCategoryClick('all')}>
            <ListItemText primary="All Products" />
          </ListItem>
          <ListItem ButtonBase onClick={() => handleCategoryClick('even')}>
            <ListItemText primary="Even Products" />
          </ListItem>
          <ListItem ButtonBase onClick={() => handleCategoryClick('odd')}>
            <ListItemText primary="Odd Products" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default CategorySidebar;
