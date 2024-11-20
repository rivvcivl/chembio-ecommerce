import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

export const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ mb: 6, fontWeight: 600, textAlign: 'center' }}
      >
        About Chembio Lifescience
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Chembio Lifescience, we are dedicated to providing high-quality laboratory
              supplies and equipment to support scientific research and development. Our
              mission is to empower scientists and researchers with reliable tools and
              materials they need to make groundbreaking discoveries.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in fostering innovation through quality products, exceptional
              service, and sustainable practices. Our commitment to excellence drives us
              to continuously improve and expand our offerings to meet the evolving needs
              of the scientific community.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
              Our Values
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Quality:</strong> We maintain the highest standards in our product
                selection and quality control processes.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Innovation:</strong> We continuously seek new and improved solutions
                to meet the evolving needs of our customers.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Integrity:</strong> We conduct our business with honesty,
                transparency, and ethical practices.
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Sustainability:</strong> We are committed to environmentally
                responsible practices and products.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
              Our Commitment
            </Typography>
            <Typography variant="body1" paragraph>
              Since our establishment, we have been committed to serving the scientific
              community with excellence. We understand the critical nature of laboratory
              work and research, which is why we ensure that all our products meet or
              exceed industry standards.
            </Typography>
            <Typography variant="body1">
              Our team of experts is always available to provide technical support and
              guidance, ensuring that you get the most out of our products. We believe
              in building long-term relationships with our customers through trust,
              reliability, and exceptional service.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
