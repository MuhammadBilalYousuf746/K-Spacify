const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(401).json({ message: 'Invalid email ya password' });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, email });
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;