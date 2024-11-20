const express = require('express');
const { Product } = require('../models');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, isActive: true }
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update({ isActive: false });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Create demo products
const createDemoProducts = async () => {
  try {
    const demoProducts = [
      {
        name: 'Laboratory Microscope',
        description: 'High-precision laboratory microscope with digital display',
        price: 1299.99,
        category: 'Equipment',
        brand: 'ChemTech',
        stockQuantity: 10,
        imageUrls: ['microscope.jpg']
      },
      {
        name: 'Chemical Analysis Kit',
        description: 'Complete kit for basic chemical analysis',
        price: 299.99,
        category: 'Kits',
        brand: 'ChemPro',
        stockQuantity: 25,
        imageUrls: ['analysis-kit.jpg']
      },
      {
        name: 'Safety Goggles',
        description: 'Professional-grade safety goggles',
        price: 49.99,
        category: 'Safety',
        brand: 'SafetyFirst',
        stockQuantity: 100,
        imageUrls: ['goggles.jpg']
      }
    ];

    for (const product of demoProducts) {
      await Product.findOrCreate({
        where: { name: product.name },
        defaults: product
      });
    }

    console.log('Demo products created successfully');
  } catch (error) {
    console.error('Error creating demo products:', error);
  }
};

module.exports = { router, createDemoProducts };
