const express = require('express');
const userRouter = require('../controllers/userControllers');

const router = express.Router();

router
  .route('/')
  .post(userRouter.register)
  .post(userRouter.login);


module.exports = router;



