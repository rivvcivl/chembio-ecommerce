const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { createDemoAccounts } = require('./routes/auth');
const { createDemoProducts } = require('./routes/products');
const { createDemoOrder } = require('./routes/orders');
const { User, Product } = require('./models');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

console.log('CORS configuration:', corsOptions);
app.use(cors(corsOptions));

// Database Connection
const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    console.log('Syncing database...');
    await sequelize.sync({ alter: true });
    console.log('Database sync completed.');

    // Routes
    app.use('/api/auth', require('./routes/auth').router);
    app.use('/api/products', require('./routes/products').router);
    app.use('/api/orders', require('./routes/orders').router);

    // Add a health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Initialize demo data
    const initializeDemoData = async () => {
      try {
        console.log('Starting demo data initialization...');
        
        // Create demo accounts
        await createDemoAccounts();
        console.log('Demo accounts created');
        
        // Create demo products
        await createDemoProducts();
        console.log('Demo products created');
        
        // Create demo order for the demo user
        const demoUser = await User.findOne({ where: { email: 'user@demo.com' } });
        const products = await Product.findAll({ limit: 2 });
        
        if (demoUser && products.length > 0) {
          await createDemoOrder(demoUser.id, products.map(p => ({
            id: p.id,
            price: p.price,
            quantity: 1
          })));
          console.log('Demo order created');
        }
        
        console.log('Demo data initialization completed');
      } catch (error) {
        console.error('Error initializing demo data:', error);
      }
    };

    await initializeDemoData();

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Global error handler:', err);
      res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
      console.log(`Frontend URL: ${corsOptions.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
