const express = require('express');
const userRouter = require('./routes/userRoutes');
const toDoListRouter = require('./routes/toDoListRoutes');
const authenticateToken = require('./authMiddleware');

const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// -------------------------------------------------------

// Routs
// --------------------------------
// Public Route
app.use('/api/v1', userRouter);

// Private Route
app.use('/api/v1', authenticateToken, toDoListRouter);

// -----------------------------------------------

module.exports = app;
