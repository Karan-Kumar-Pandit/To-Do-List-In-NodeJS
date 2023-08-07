const User = require('../models/userModels');
const Token = require('../models/tokensModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ------------------------------------------------------------
exports.register = async (req, res) => {
     const { username, password, password_confirmation, firstname, lastname } = req.body;
     const existingUser = await User.findOne({ username: username });
     console.log(existingUser);
     if (existingUser) {
          res.send({ status: 'failed', message: 'Username already exists' });
     } else {
          if (username && password && password_confirmation && firstname && lastname) {
               if (password === password_confirmation) {
                    try {
                         const salt = await bcrypt.genSalt(10);
                         const hashedPassword = await bcrypt.hash(password, salt);
                         const user = new User({
                              username: username,
                              password: hashedPassword,
                              firstname: firstname,
                              lastname: lastname
                         });
                         await user.save();
                         res.status(201).send({
                              status: 'success',
                              message: 'User registered successfully'
                         });
                    } catch (error) {
                         console.log(error);
                         res.send({
                              status: 'failed',
                              message: 'Unable to Register'
                         });
                    }
               } else {
                    res.send({
                         status: 'failed',
                         message: "Password and Confirm Password dosen't match"
                    });
               }
          } else {
               res.send({ status: 'failed', message: 'All fields are required' });
          }
     }
};

// --------------------------------------------------------------
exports.login = async (req, res) => {
     try {
          const { username, password } = req.body;
          if (username && password) {
               const user = await User.findOne({ username: username });

               if (user != null) {
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (user.username === username && passwordMatch) {
                         // Generate JWT Token
                         const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KAY, { expiresIn: '5m' });

                         // Save the token to the database
                         const tokenEntry = new Token({ token: token, userID: user._id });
                         await tokenEntry.save();

                         res.send({ status: 'success', message: 'Login Success', token: token });
                    } else {
                         res.send({ status: 'failed', message: 'Username or Password is not valid' });
                    }
               } else {
                    res.send({ status: 'failed', message: 'You are not registered.' });
               }
          } else {
               res.send({ status: 'failed', message: 'All fields are required.' });
          }
     } catch (error) {
          console.log(error);
          res.send({ status: 'failed', message: 'Unable to Login' });
     }
};
