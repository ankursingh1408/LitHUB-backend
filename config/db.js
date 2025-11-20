const mongoose = require('mongoose');
const path = require('path');
// Load environment variables from the repo root .env if present
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const config = require('config');

// Prefer an explicit environment variable, fall back to config file
let db = process.env.mongoURI;
if (!db) {
  try {
    db = config.get('mongoURI');
  } catch (err) {
    console.error('mongoURI not found in environment variables or config. Set `mongoURI` in .env or in config/default.json');
    process.exit(1);
  }
}

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
