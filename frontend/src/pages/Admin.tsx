import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export const Admin: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Admin functionality coming soon...
        </Typography>
      </Box>
    </Container>
  );
};
