const express = require('express');
const userRouter = require('../controllers/userControllers');

const router = express.Router();
router.route('/user/register').post(userRouter.register);
router.route('/user/login').post(userRouter.login);

module.exports = router;
