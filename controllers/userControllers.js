const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ------------------------------------------------------------
exports.register = async (req, res) => {
     // try {
     //   const { username, password, firstname, lastname } = req.body;
     //   const existingUser = await User.findOne({ username });

     //   if (existingUser) {
     //     return res.status(409).json({ message: 'Username already exists' });
     //   }
     //   const saltRounds = 10;
     //   const hashedPassword = await bcrypt.hash(password, saltRounds);
     //   const user = new User({
     //     username,
     //     password: hashedPassword,
     //     firstname,
     //     lastname,
     //   });
     //   await user.save();
     //   res.status(201).json({ message: 'User registered successfully' });
     // } catch (err) {
     //   console.error('Error during registration:', err);
     //   res.status(500).json({ message: 'Internal server error during registration' });
     // }

     const { username, password, password_confirmation, firstname, lastname } = req.body;
     const existingUser = await User.findOne({ username: username });
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
                         const saved_user = await User.findOne({ username: username });
                         //  Generate JWT Token
                         const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KAY, { expiresIn: '24h' });
                         res.status(201).send({
                              status: 'success',
                              message: 'User registered successfully',
                              token: token
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
     // try {
     //   const { username, password } = req.body;

     //   const user = await User.findOne({ username });
     //   if (!user) {
     //     return res.status(401).json({ message: "Invalid credentials" });
     //   }

     //   const passwordMatch = await bcrypt.compare(password, user.password);
     //   if (!passwordMatch) {
     //     return res.status(401).json({ message: "Invalid credentials" });
     //   }

     //   const secretKey = "YOUR_SECRET_KEY"; // Replace with your own secret key
     //   const token = jwt.sign({ userId: user._id }, secretKey, {
     //     expiresIn: "1h",
     //   });

     //   res.json({ token });
     // } catch (err) {
     //   console.error("Error during login:", err);
     //   res.status(500).json({ message: "Internal server error during login" });
     // }

     try {
          const { username, password } = req.body;
          if (username && password) {
               const user = await User.findOne({ username: username });
               if (user != null) {
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (user.username === username && passwordMatch) {
                         // Generate JWT Token
                         const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KAY, { expiresIn: '24h' });
                         res.send({ status: 'success', message: 'Login Success', token: token });
                    } else {
                         res.send({ status: 'failed', message: 'Username or Password is not valid' });
                    }
               } else {
                    res.send({ status: 'failed', message: 'You are not a Register User' });
               }
          } else {
               res.send({ status: 'failed', message: 'All fields are required' });
          }
     } catch (error) {
          console.log(error);
          res.send({ status: 'failed', message: 'Unable to Login' });
     }
};
