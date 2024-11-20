const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const router = express.Router();

// Create demo accounts on server start
const createDemoAccounts = async () => {
  try {
    console.log('Creating demo accounts...');
    
    // Create demo user
    const [demoUser] = await User.findOrCreate({
      where: { email: 'user@demo.com' },
      defaults: {
        firstName: 'Demo',
        lastName: 'User',
        password: 'demo123',
        role: 'customer',
        isVerified: true
      }
    });

    // Create demo admin
    const [demoAdmin] = await User.findOrCreate({
      where: { email: 'admin@demo.com' },
      defaults: {
        firstName: 'Demo',
        lastName: 'Admin',
        password: 'admin123',
        role: 'admin',
        isVerified: true
      }
    });

    // Update passwords if accounts already existed
    if (demoUser) {
      await demoUser.update({ password: 'demo123' });
    }
    if (demoAdmin) {
      await demoAdmin.update({ password: 'admin123' });
    }

    console.log('Demo accounts setup completed successfully');
  } catch (error) {
    console.error('Error creating demo accounts:', error);
    throw error;
  }
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.validatePassword(password);
    console.log('Password validation result:', isValidPassword);

    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'chembio_jwt_secret_key_for_development',
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', email);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Add a test route to check if demo accounts exist
router.get('/check-demo-accounts', async (req, res) => {
  try {
    console.log('Checking demo accounts...');
    
    // Test database connection first
    await User.sequelize.authenticate();
    console.log('Database connection successful');
    
    // Check if the Users table exists
    const tables = await User.sequelize.getQueryInterface().showAllTables();
    console.log('Available tables:', tables);
    
    if (!tables.includes('Users')) {
      console.log('Users table does not exist, creating demo accounts...');
      await createDemoAccounts();
    }
    
    const demoUser = await User.findOne({ where: { email: 'user@demo.com' } });
    const demoAdmin = await User.findOne({ where: { email: 'admin@demo.com' } });

    console.log('Demo user found:', !!demoUser);
    console.log('Demo admin found:', !!demoAdmin);

    if (!demoUser || !demoAdmin) {
      console.log('Some demo accounts missing, creating them...');
      await createDemoAccounts();
    }

    // Update passwords for existing accounts
    if (demoUser) {
      await demoUser.update({ password: 'demo123' });
    }
    if (demoAdmin) {
      await demoAdmin.update({ password: 'admin123' });
    }

    // Fetch the accounts again after potential creation
    const updatedDemoUser = await User.findOne({ where: { email: 'user@demo.com' } });
    const updatedDemoAdmin = await User.findOne({ where: { email: 'admin@demo.com' } });

    res.json({
      demoUserExists: !!updatedDemoUser,
      demoAdminExists: !!updatedDemoAdmin,
      demoUser: updatedDemoUser ? {
        email: updatedDemoUser.email,
        role: updatedDemoUser.role,
        isVerified: updatedDemoUser.isVerified
      } : null,
      demoAdmin: updatedDemoAdmin ? {
        email: updatedDemoAdmin.email,
        role: updatedDemoAdmin.role,
        isVerified: updatedDemoAdmin.isVerified
      } : null
    });
  } catch (error) {
    console.error('Error checking demo accounts:', error);
    res.status(500).json({ 
      message: 'Error checking demo accounts', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = { router, createDemoAccounts };
