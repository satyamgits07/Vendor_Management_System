const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Admin Dashboard Route (protected)
router.get('/admin', verifyToken, (req, res) => {
  if (req.user.role === 'Admin') {
    res.send('Welcome to the Admin Dashboard');
  } else {
    res.status(403).json({ message: 'Access denied, not an Admin' });
  }
});

// Vendor Dashboard Route (protected)
router.get('/vendor', verifyToken, (req, res) => {
  if (req.user.role === 'Vendor') {
    res.send('Welcome to the Vendor Dashboard');
  } else {
    res.status(403).json({ message: 'Access denied, not a Vendor' });
  }
});

// User Dashboard Route (protected)
router.get('/user', verifyToken, (req, res) => {
  if (req.user.role === 'User') {
    res.send('Welcome to the User Dashboard');
  } else {
    res.status(403).json({ message: 'Access denied, not a User' });
  }
});

module.exports = router;
