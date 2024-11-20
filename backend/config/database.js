const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Database configuration:', {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres'
});

const sequelize = new Sequelize(
  process.env.DB_NAME || 'chembio_ecommerce', 
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || 'postgres', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Test database permissions
    await sequelize.query('SELECT 1+1 as result');
    console.log('Database query test successful.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
