import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = {
    address: '123 Science Park Drive, Boston, MA 02142',
    phone: '+1 (555) 123-4567',
    email: 'contact@chembio.com',
  };

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
    { icon: <Instagram />, url: 'https://instagram.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Chembio Lifescience
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted partner in laboratory and research supplies. Delivering quality scientific products since 2010.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component={Link}
                  href={social.url}
                  target="_blank"
                  sx={{ color: 'white', '&:hover': { color: 'grey.300' } }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="nav">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  component="button"
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: 'white',
                    display: 'block',
                    mb: 1,
                    textDecoration: 'none',
                    '&:hover': { color: 'grey.300' },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn />
                <Typography variant="body2">{contactInfo.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone />
                <Link
                  href={`tel:${contactInfo.phone}`}
                  sx={{ color: 'white', '&:hover': { color: 'grey.300' } }}
                >
                  {contactInfo.phone}
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email />
                <Link
                  href={`mailto:${contactInfo.email}`}
                  sx={{ color: 'white', '&:hover': { color: 'grey.300' } }}
                >
                  {contactInfo.email}
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Chembio Lifescience. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
