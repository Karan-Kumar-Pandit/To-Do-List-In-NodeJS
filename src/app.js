const express = require('express');
const userRouter = require('./routes/userRoutes');
const toDoListRouter = require('./routes/toDoListRoutes');

const app = express();

app.use(express.json());

// -------------------------------------------------------

// Routs
app.use('/api/v1', userRouter);
app.use('/api/v1', toDoListRouter);

// -----------------------------------------------

module.exports = app;
