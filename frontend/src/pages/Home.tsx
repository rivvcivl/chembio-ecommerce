import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Science,
  LocalShipping,
  Support,
  Verified,
} from '@mui/icons-material';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Laboratory Equipment',
      description: 'High-quality lab equipment for research and analysis',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400',
    },
    {
      title: 'Chemical Reagents',
      description: 'Pure and certified chemical reagents for precise results',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400',
    },
    {
      title: 'Lab Supplies',
      description: 'Essential supplies for your laboratory needs',
      image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=400',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1920&q=80)`,
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.primary.dark, 0.7),
            backgroundImage: `linear-gradient(to bottom right, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.secondary.dark, 0.8)})`,
          }
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3,
              maxWidth: '800px'
            }}
          >
            Welcome to Chembio Lifescience
          </Typography>
          <Typography 
            variant="h5" 
            color="inherit" 
            paragraph
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              maxWidth: '600px'
            }}
          >
            Your trusted partner in scientific research and laboratory supplies. We provide cutting-edge equipment and premium quality chemicals for your research needs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              }
            }}
          >
            Explore Products
          </Button>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/products')}
                    sx={{
                      mt: 'auto',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Science color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                  Quality Products
                </Typography>
                <Typography color="text.secondary" align="center">
                  ISO certified products
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <LocalShipping color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                  Fast Delivery
                </Typography>
                <Typography color="text.secondary" align="center">
                  Nationwide shipping
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Support color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                  24/7 Support
                </Typography>
                <Typography color="text.secondary" align="center">
                  Expert assistance
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Verified color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                  Certified
                </Typography>
                <Typography color="text.secondary" align="center">
                  Quality assured
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
