const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/', (req, res) => res.send('K-Spacify API running'));

// Optimized MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Bilal MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
})
.catch((err) => console.error(err));