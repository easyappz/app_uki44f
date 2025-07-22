const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Photo = require('./models/photo');

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, gender, age } = req.body;
    if (!email || !password || !gender || age === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (age < 18 || age > 100) {
      return res.status(400).json({ message: 'Age must be between 18 and 100' });
    }
    
    if (!['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender value' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, gender, age });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// POST /api/upload-photo
router.post('/upload-photo', authenticateUser, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'Photo URL is required' });
    }

    const user = await User.findById(req.user.userId);
    if (user.points < 10) {
      return res.status(400).json({ message: 'Not enough points to upload a photo' });
    }

    const photo = new Photo({ userId: req.user.userId, url });
    await photo.save();

    user.points -= 10;
    await user.save();

    res.status(201).json({ message: 'Photo uploaded successfully', photo });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error: error.message });
  }
});

// GET /api/photos-to-rate
router.get('/photos-to-rate', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const photos = await Photo.find({
      userId: { $ne: req.user.userId },
      $or: [
        { likes: { $lt: 10 } },
        { dislikes: { $lt: 10 } }
      ]
    }).limit(10);

    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error: error.message });
  }
});

// POST /api/rate-photo
router.post('/rate-photo', authenticateUser, async (req, res) => {
  try {
    const { photoId, rating } = req.body;
    if (!photoId || !['like', 'dislike'].includes(rating)) {
      return res.status(400).json({ message: 'Invalid rating data' });
    }

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const user = await User.findById(req.user.userId);

    if (rating === 'like') {
      photo.likes += 1;
      user.points += 1;
    } else {
      photo.dislikes += 1;
    }

    await photo.save();
    await user.save();

    res.json({ message: 'Photo rated successfully', photo });
  } catch (error) {
    res.status(500).json({ message: 'Error rating photo', error: error.message });
  }
});

// GET /api/user-photos
router.get('/user-photos', authenticateUser, async (req, res) => {
  try {
    const photos = await Photo.find({ userId: req.user.userId });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user photos', error: error.message });
  }
});

// DELETE /api/delete-photo/:photoId
router.delete('/delete-photo/:photoId', authenticateUser, async (req, res) => {
  try {
    const photo = await Photo.findOneAndDelete({
      _id: req.params.photoId,
      userId: req.user.userId
    });

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found or not owned by user' });
    }

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting photo', error: error.message });
  }
});

module.exports = router;