import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Rating,
  Tabs,
  Tab,
  Divider,
  TextField,
  Chip,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '../stores/cartStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addItem);

  // Mock product data - replace with actual API call
  const product = {
    id: productId,
    name: 'High-Precision Laboratory Scale',
    price: 1299.99,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    sku: 'LAB-SCALE-001',
    category: 'Laboratory Equipment',
    description: 'Professional-grade laboratory scale with high precision measurements up to 0.0001g. Perfect for research laboratories and industrial applications.',
    specifications: [
      { label: 'Measurement Range', value: '0.0001g - 220g' },
      { label: 'Accuracy', value: '±0.0001g' },
      { label: 'Platform Size', value: '90mm diameter' },
      { label: 'Display', value: 'LCD with backlight' },
      { label: 'Calibration', value: 'Internal automatic' },
      { label: 'Power Supply', value: 'AC adapter (included)' },
    ],
    features: [
      'High-precision weighing system',
      'Internal automatic calibration',
      'Multiple weighing units',
      'Overload protection',
      'RS-232 interface',
      'GLP/GMP compliant',
    ],
    images: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images and Basic Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Chip label={`SKU: ${product.sku}`} variant="outlined" />
              <Chip label={`Category: ${product.category}`} variant="outlined" />
              <Chip 
                label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                color={product.stock > 0 ? 'success' : 'error'}
              />
            </Stack>

            <Box sx={{ mb: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 100, mr: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="large"
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Product Details Tabs */}
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Specifications" />
                <Tab label="Features" />
                <Tab label="Reviews" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                {product.specifications.map((spec, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {spec.label}:
                      </Typography>
                      <Typography variant="body1">
                        {spec.value}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                {product.features.map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="body1">
                      • {feature}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                Reviews coming soon...
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
