import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { SpecialOffers } from './pages/SpecialOffers';
import { ProductDetails } from './pages/ProductDetails';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flex: '1 0 auto', width: '100%', pt: 2, pb: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/special-offers" element={<SpecialOffers />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
