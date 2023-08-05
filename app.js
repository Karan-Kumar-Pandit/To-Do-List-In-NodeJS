const express = require('express');
const toDoListRouter = require('./routes/toDoListRoutes');
const userRouter = require('./routes/userRoutes')

const app = express();


app.use(express.json());

// -------------------------------------------------------

// Routs
app.use('/api/v1/toDoList', toDoListRouter);
app.use('/api/v2/user/register', userRouter);
app.use('/api/v2/user/login', userRouter);


// -----------------------------------------------

module.exports = app;
