import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useStore } from '../store';
import { Product } from '../services/api';

interface CartItem {
  product: Product;
  quantity: number;
}

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCartItemQuantity, removeFromCart, getCartTotal }: { 
    cart: CartItem[], 
    updateCartItemQuantity: (productId: string, quantity: number) => void, 
    removeFromCart: (productId: string) => void, 
    getCartTotal: () => number 
  } = useStore();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateCartItemQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map(({ product, quantity }: CartItem) => (
            <Card key={product.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <img
                      src={product.imageUrls[0] || '/placeholder.jpg'}
                      alt={product.name}
                      style={{ width: '100%', maxHeight: '100px', objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, quantity - 1)}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        size="small"
                        value={quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handleQuantityChange(product.id, value);
                          }
                        }}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        sx={{ width: '60px' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle1" align="right">
                      ${(product.price * quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Typography>Subtotal</Typography>
                  <Typography>${getCartTotal().toFixed(2)}</Typography>
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${getCartTotal().toFixed(2)}</Typography>
                </Grid>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => navigate('/products')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
