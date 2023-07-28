const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

// CONNECT TO MONGODB
// ---------------------------------------
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connect to MongoDB Successfully!..');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// ----------------------------------------

// Start Server
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
