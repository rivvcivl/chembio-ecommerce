const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');

// User and Order relationship
User.hasMany(Order, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});
Order.belongsTo(User);

// Order and Product (Many-to-Many relationship through OrderItem)
const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// Sync models
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database models:', error);
  }
};

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  syncModels
};
