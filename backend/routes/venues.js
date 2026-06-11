const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// GET all venues with filters
router.get('/', async (req, res) => {
  try {
    const { area, capacity, budget, timing } = req.query;
    let filter = {};
    if (area) filter.area = { $regex: area, $options: 'i' };
    if (capacity) filter.capacity = { $gte: Number(capacity) };
    if (budget) filter.pricePerDay = { $lte: Number(budget) };
    if (timing) filter.timing = { $regex: timing, $options: 'i' };

    const venues = await Venue.find(filter);
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create venue (admin)
router.post('/', async (req, res) => {
  try {
    const venue = new Venue(req.body);
    const saved = await venue.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;