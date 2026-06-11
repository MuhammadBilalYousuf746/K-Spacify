const mongoose = require('mongoose');
require('dotenv').config();
const Venue = require('./models/Venue');

const venues = [
  {
    name: 'Al-Noor Community Hall',
    area: 'Gulshan-e-Iqbal',
    capacity: 200,
    pricePerDay: 45000,
    timing: 'Full Day',
    address: 'Block 13, Gulshan-e-Iqbal, Karachi',
    description: 'Spacious community hall with AC, stage, and parking. Dholki, birthdays, aur small weddings ke liye perfect.',
    amenities: ['AC', 'Stage', 'Parking', 'Catering Kitchen'],
    isAvailable: true
  },
  {
    name: 'Green Valley Lawn',
    area: 'North Nazimabad',
    capacity: 500,
    pricePerDay: 120000,
    timing: 'Evening',
    address: 'Block H, North Nazimabad, Karachi',
    description: 'Open lawn with lush greenery, outdoor lighting, and dedicated event staff. Shaadi aur corporate events ke liye ideal.',
    amenities: ['Outdoor Lighting', 'Event Staff', 'Parking', 'Generator'],
    isAvailable: true
  },
  {
    name: 'DHA Marquee',
    area: 'DHA',
    capacity: 800,
    pricePerDay: 250000,
    timing: 'Full Day',
    address: 'Phase 6, DHA, Karachi',
    description: 'Premium marquee with state-of-the-art sound system, VIP lounge, and bridal room. Luxury events ke liye.',
    amenities: ['Sound System', 'VIP Lounge', 'Bridal Room', 'Valet Parking', 'AC'],
    isAvailable: true
  },
  {
    name: 'Clifton Rooftop Terrace',
    area: 'Clifton',
    capacity: 100,
    pricePerDay: 80000,
    timing: 'Evening',
    address: 'Block 5, Clifton, Karachi',
    description: 'Stunning rooftop venue with sea view. Corporate dinners, birthday parties aur intimate gatherings ke liye.',
    amenities: ['Sea View', 'Bar Counter', 'DJ Setup', 'AC'],
    isAvailable: true
  },
  {
    name: 'Nazimabad Sports Ground',
    area: 'Nazimabad',
    capacity: 300,
    pricePerDay: 25000,
    timing: 'Morning',
    address: 'Nazimabad No. 3, Karachi',
    description: 'Cricket ground aur open space. Sports events, school functions, aur outdoor gatherings ke liye best option.',
    amenities: ['Cricket Pitch', 'Changing Rooms', 'Floodlights', 'Parking'],
    isAvailable: true
  },
  {
    name: 'PECHS Banquet Hall',
    area: 'PECHS',
    capacity: 350,
    pricePerDay: 95000,
    timing: 'Full Day',
    address: 'Block 2, PECHS, Karachi',
    description: 'Classic banquet hall with elegant decor, full catering service, aur dedicated event coordinator.',
    amenities: ['Catering', 'Decor', 'AC', 'Stage', 'Parking'],
    isAvailable: true
  },
  {
    name: 'Johar Community Ground',
    area: 'Johar',
    capacity: 150,
    pricePerDay: 18000,
    timing: 'Morning',
    address: 'Johar More, Karachi',
    description: 'Budget-friendly open ground. School events, cricket tournaments, aur small gatherings ke liye affordable option.',
    amenities: ['Open Space', 'Washrooms', 'Parking'],
    isAvailable: true
  },
  {
    name: 'Bahadurabad Party Hall',
    area: 'Bahadurabad',
    capacity: 120,
    pricePerDay: 35000,
    timing: 'Evening',
    address: 'Bahadurabad Chowrangi, Karachi',
    description: 'Cozy indoor hall with modern lighting and sound. Birthday parties aur dholki functions ke liye perfect.',
    amenities: ['Sound System', 'Lighting', 'AC', 'Backup Generator'],
    isAvailable: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Venue.deleteMany({});
    console.log('Old venues cleared');

    await Venue.insertMany(venues);
    console.log('✅ 8 venues added successfully!');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    mongoose.disconnect();
  }
}

seed();