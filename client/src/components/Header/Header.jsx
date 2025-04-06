import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ themeMode, toggleTheme }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 ,padding:2}}>
      <Typography variant="h5" component="h1">Task Management App</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/table">Table View</Button>
        <Button onClick={toggleTheme} color="inherit">
          {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
