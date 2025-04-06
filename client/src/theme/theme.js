import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        main: '#0066cc', // Vibrant blue
                    },
                    background: {
                        default: '#f9fafb', // Light gray background
                        paper: '#ffffff',   // White card background
                    },
                    text: {
                        primary: '#1a1a1a',   // Almost black
                        secondary: '#555555', // Medium gray
                    },
                }
                : {
                    primary: {
                        main: '#66b2ff', // Soft sky blue
                    },
                    background: {
                        default: '#0d1117', // Deep GitHub dark
                        paper: '#161b22',   // Slightly lighter dark
                    },
                    text: {
                        primary: '#1976d2',   // Near-white
                        secondary: '#f0f8ff', // Cool gray
                    },
                    // text: {
                    //     primary: '#1976d2',
                    //     secondary: '#aaaaaa',
                    // },
                }),
        },
        typography: {
            fontFamily: 'Arial, sans-serif',
            h1: {
                fontSize: '2rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '1.5rem',
                fontWeight: 500,
            },
        },
    });