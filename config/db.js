const mongoose = require('mongoose');
const config = require('./config');

async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // stop app if unable to reach  database
  }
}

module.exports = connectDB;