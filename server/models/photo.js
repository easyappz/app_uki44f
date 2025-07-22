const mongoose = require('mongoose');
const { mongoDb } = require('../db');

const photoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  totalRatings: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  genderStats: {
    male: { type: Number, default: 0 },
    female: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  ageStats: {
    under18: { type: Number, default: 0 },
    '18-24': { type: Number, default: 0 },
    '25-34': { type: Number, default: 0 },
    '35-44': { type: Number, default: 0 },
    '45plus': { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

const Photo = mongoDb.model('Photo', photoSchema);

module.exports = Photo;