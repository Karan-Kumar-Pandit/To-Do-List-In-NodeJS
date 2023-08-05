const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
     token: {
          type: String,
          required: true
     },
     userID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User' // Reference to the User model
     },
     createdAt: {
          type: Date,
          expires: '24h', // The token will expire after 24 hours
          default: Date.now
     }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
