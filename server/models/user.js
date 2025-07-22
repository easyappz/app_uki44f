const mongoose = require('mongoose');
const { mongoDb } = require('../db');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  age: { type: Number, required: true, min: 18, max: 100 },
  points: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoDb.model('User', userSchema);

module.exports = User;