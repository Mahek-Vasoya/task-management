import React from 'react';
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #e0f2ff, #f5f8ff)',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '24px',
          padding: { xs: 3, md: 6 },
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fdfefe',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box sx={{ flex: 1, pr: { md: 4 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: '#003366' }}>
            Welcome to <br /> Task Management
          </Typography>
          <Typography variant="h6" sx={{ color: '#5f6368', mb: 4 }}>
            Organize & Analyze your tasks efficiently.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="primary"
              startIcon={<DashboardIcon />}
              sx={{
                px: 3, py: 1.5,
                backgroundColor: '#0066cc',
                '&:hover': { backgroundColor: '#005bb5' }
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              component={Link}
              to="/table"
              variant="outlined"
              color="secondary"
              startIcon={<TableChartIcon />}
              sx={{
                px: 3, py: 1.5,
                borderColor: '#8e24aa',
                color: '#8e24aa',
                '&:hover': {
                  borderColor: '#6a1b9a',
                  backgroundColor: '#f3e5f5'
                }
              }}
            >
              View Tasks Table
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1, mt: { xs: 4, md: 0 }, textAlign: 'center' }}>
          <img
            src="/task-illustration.png"
            alt="Task Illustration"
            style={{ width: '100%', maxWidth: '360px' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
