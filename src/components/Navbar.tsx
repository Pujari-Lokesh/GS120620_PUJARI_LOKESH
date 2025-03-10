import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = true; // Mock authentication status

    const handleAuthAction = () => {
        if (isAuthenticated) {
            alert("Logged out successfully!");
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <img 
                        src="/assets/logo.png"
                        alt="GSynergy Logo" 
                        style={{ height: 40, marginRight: 10 }} 
                    />
                    Data Viewer
                </Typography>
                <Button color="inherit" onClick={handleAuthAction}>
                    {isAuthenticated ? 'Sign Out' : 'Sign In'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
