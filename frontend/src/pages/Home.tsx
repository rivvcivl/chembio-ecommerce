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

// Import local images
import labEquipmentImg from '../assets/images/lab-equipment.jpg';
import chemicalReagentsImg from '../assets/images/chemical-reagents.jpg';
import labSuppliesImg from '../assets/images/lab-supplies.jpg';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Laboratory Equipment',
      description: 'High-quality lab equipment for research and analysis',
      image: labEquipmentImg,
    },
    {
      title: 'Chemical Reagents',
      description: 'Pure and certified chemical reagents for precise results',
      image: chemicalReagentsImg,
    },
    {
      title: 'Lab Supplies',
      description: 'Essential supplies for your laboratory needs',
      image: labSuppliesImg,
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
          backgroundImage: `url(${labEquipmentImg})`,
          minHeight: '500px',
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome to Chembio Lifescience
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Your trusted source for laboratory and scientific supplies
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Explore Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Products Section */}
      <Container>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mt: 8 }}>
        <Container>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Science color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center">
                  Quality Products
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <LocalShipping color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center">
                  Fast Shipping
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Support color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center">
                  Expert Support
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Verified color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" align="center">
                  Certified Products
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
