const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  date: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  timing: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);