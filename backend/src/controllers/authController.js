const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_EXPIRES_IN } = require('../config/constants');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, providedPassword: password ? '***' : 'missing' });
    console.log('Expected:', { 
      email: process.env.ADMIN_EMAIL, 
      password: process.env.ADMIN_PASSWORD ? '***' : 'missing' 
    });

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      console.log('Login failed: Invalid credentials');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log('Login successful for:', email);
    res.json({ success: true, token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verify = async (req, res) => {
  try {
    res.json({ success: true, admin: { email: req.admin.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
