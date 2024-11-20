import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { LocalOffer, Timer, ShoppingCart } from '@mui/icons-material';

export const SpecialOffers: React.FC = () => {
  const theme = useTheme();

  // Mock data for special offers
  const specialOffers = [
    {
      id: 1,
      title: 'Premium Microscope Set',
      description: 'Complete laboratory microscope kit with advanced optics and accessories',
      originalPrice: 1299.99,
      discountedPrice: 899.99,
      discountPercentage: 30,
      image: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?auto=format&fit=crop&w=500',
      timeLeft: '2 days',
      stock: 5,
    },
    {
      id: 2,
      title: 'Laboratory Glassware Bundle',
      description: 'Essential glassware set including beakers, flasks, and test tubes',
      originalPrice: 499.99,
      discountedPrice: 299.99,
      discountPercentage: 40,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500',
      timeLeft: '5 days',
      stock: 10,
    },
    {
      id: 3,
      title: 'Digital pH Meter',
      description: 'High-precision digital pH meter with automatic calibration',
      originalPrice: 299.99,
      discountedPrice: 199.99,
      discountPercentage: 33,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500',
      timeLeft: '3 days',
      stock: 8,
    },
    {
      id: 4,
      title: 'Chemical Reagent Kit',
      description: 'Comprehensive set of pure chemical reagents for various experiments',
      originalPrice: 799.99,
      discountedPrice: 599.99,
      discountPercentage: 25,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500',
      timeLeft: '4 days',
      stock: 15,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', py: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Special Offers
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Don't miss out on these exclusive deals! Limited time offers on premium laboratory equipment and supplies.
          </Typography>
        </Box>

        {/* Offers Grid */}
        <Grid container spacing={4}>
          {specialOffers.map((offer) => (
            <Grid item key={offer.id} xs={12} sm={6} md={6}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Discount Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label={`${offer.discountPercentage}% OFF`}
                    color="error"
                    size="medium"
                    icon={<LocalOffer />}
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>

                <CardMedia
                  component="img"
                  sx={{
                    height: 300,
                    objectFit: 'cover',
                  }}
                  image={offer.image}
                  alt={offer.title}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {offer.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {offer.description}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      ${offer.discountedPrice}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${offer.originalPrice}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Chip
                      icon={<Timer />}
                      label={`Ends in ${offer.timeLeft}`}
                      color="warning"
                      variant="outlined"
                    />
                    <Chip
                      label={`Only ${offer.stock} left`}
                      color="info"
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    sx={{
                      bgcolor: theme.palette.success.main,
                      '&:hover': {
                        bgcolor: theme.palette.success.dark,
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Don't See What You're Looking For?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Check back regularly for new special offers or contact our sales team for custom quotes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Contact Sales Team
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
