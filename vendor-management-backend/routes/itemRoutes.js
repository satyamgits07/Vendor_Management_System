const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Item = require('../models/Item');
const router = express.Router();

// Add new item (only accessible to vendors)
router.post('/add', verifyToken, async (req, res) => {
  if (req.user.role !== 'Vendor') {
    return res.status(403).json({ message: 'Access denied, only vendors can add items' });
  }

  const { name, price, description } = req.body;
  try {
    const newItem = new Item({
      name,
      price,
      description,
      vendor: req.user.id,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item' });
  }
});

// Get all items by vendor
router.get('/vendor-items', verifyToken, async (req, res) => {
  if (req.user.role !== 'Vendor') {
    return res.status(403).json({ message: 'Access denied, only vendors can view their items' });
  }

  try {
    const items = await Item.find({ vendor: req.user.id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Delete an item
router.delete('/:itemId', verifyToken, async (req, res) => {
  if (req.user.role !== 'Vendor') {
    return res.status(403).json({ message: 'Access denied, only vendors can delete items' });
  }

  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this item' });
    }

    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;
