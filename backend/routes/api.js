const express = require('express');
const router = express.Router();
const User = require('../models/db_schema');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token }); // 201 mostly used for as a created status code
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error'); // server error huh
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
