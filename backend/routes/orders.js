const express = require('express');
const { Order, OrderItem, Product } = require('../models');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all orders (admin sees all, users see their own)
router.get('/', auth, async (req, res) => {
  try {
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const orders = await Order.findAll({
      where,
      include: [{
        model: Product,
        through: { attributes: ['quantity', 'price'] }
      }]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const where = { id: req.params.id };
    if (req.user.role !== 'admin') {
      where.userId = req.user.id;
    }
    
    const order = await Order.findOne({
      where,
      include: [{
        model: Product,
        through: { attributes: ['quantity', 'price'] }
      }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    let totalAmount = 0;

    // Calculate total amount and verify stock
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stockQuantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for product: ${product?.name || item.productId}` 
        });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      shippingAddress,
      paymentMethod: 'demo', // For MVP
      paymentStatus: 'paid'  // For MVP
    });

    // Create order items and update stock
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock
      await product.update({
        stockQuantity: product.stockQuantity - item.quantity
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Create demo order
const createDemoOrder = async (userId, products) => {
  try {
    let totalAmount = 0;
    for (const product of products) {
      totalAmount += product.price * product.quantity;
    }

    const order = await Order.create({
      userId,
      totalAmount,
      shippingAddress: {
        street: '123 Demo Street',
        city: 'Demo City',
        state: 'DS',
        zipCode: '12345',
        country: 'Demo Country'
      },
      paymentMethod: 'demo',
      paymentStatus: 'paid',
      status: 'delivered'
    });

    for (const product of products) {
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
        price: product.price
      });
    }

    console.log('Demo order created successfully');
  } catch (error) {
    console.error('Error creating demo order:', error);
  }
};

module.exports = { router, createDemoOrder };
