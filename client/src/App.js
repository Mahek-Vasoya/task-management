import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, CircularProgress, Box } from '@mui/material';
import { getTheme } from './theme/theme';
import Header from './components/Header/Header';
import { useInitApp } from './hooks/useInitApp';

// Lazy-loaded views
const HomePage = lazy(() => import('./components/HomePageView/HomePage'));
const Dashboard = lazy(() => import('./components/DashboardView/Dashboard'));
const TableView = lazy(() => import('./components/TableView/TableView'));

const App = () => {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useInitApp(setLoading, setError);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    localStorage.setItem('themeMode', nextTheme);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red', fontSize: '1.2rem' }}>
        {error}
      </Box>
    );
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Router>
        <Header themeMode={themeMode} toggleTheme={toggleTheme} />
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={40} />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/table" element={<TableView />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
