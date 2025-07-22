const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./apiRoutes');

/** Это подключение к базе данных */
/** Никогда не удаляй этот код  */
require('./db');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

const JWT_SECRET = 'your_jwt_secret';

module.exports = app;