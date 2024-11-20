import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useStore } from '../../store';
import { authApi } from '../../services/api';

export const Navbar: React.FC = () => {
  const { user, cart, setUser } = useStore();

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Chembio Lifescience
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/products"
          >
            Products
          </Button>

          {user ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/orders"
              >
                Orders
              </Button>

              {user.role === 'admin' && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/admin"
                >
                  Admin
                </Button>
              )}

              <IconButton
                color="inherit"
                component={RouterLink}
                to="/cart"
                size="large"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                component={RouterLink}
                to="/profile"
                size="large"
              >
                <Person />
              </IconButton>

              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
