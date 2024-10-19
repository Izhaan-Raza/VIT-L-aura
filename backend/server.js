require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/api/auth', authRoutes); // ok, got it that's how to add the routes


// ofc, to connect to mongodb, okkk
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// api route in okkk
app.get('/', (req, res) => {
  res.send('Hello world, it\'s me (Node.js Beginner)...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
