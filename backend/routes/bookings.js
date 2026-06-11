const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');


// POST create booking
router.post('/', async (req, res) => {
  try {
    const { venueId, date } = req.body;

    // Check if venue already booked on same date
    const existing = await Booking.findOne({
      venueId,
      date,
      status: { $ne: 'Rejected' }
    });

    if (existing) {
      return res.status(400).json({
        message: 'The venue is already booked on this date. Select another avaliable date.'
      });
    }

    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('venueId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: 'after' }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router; 
