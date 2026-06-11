const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  timing: { type: String }, // e.g. "Morning", "Evening", "Full Day"
  address: { type: String },
  description: { type: String },
  images: [String],
  amenities: [String],
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Venue', VenueSchema);