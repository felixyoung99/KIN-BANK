const express = require('express');
const config = require('./config/config');
const connectDB = require('./config/db');

const customerRoutes = require('./Routes/customerRoutes');
const accountRoutes = require('./Routes/accountRoutes');
const transferRoutes = require('./Routes/transferRoutes');
const setupRoutes = require('./Routes/setupRoutes');

const app = express();
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/accounts', accountRoutes);
app.use('/transfers', transferRoutes);
app.use('/setup', setupRoutes);

app.get('/', (req, res) => {
  res.json({ message: `${config.bankName} API is running` });
});

// Connect to the database and start listening
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`${config.bankName} server running on http://localhost:${config.port}`);
  });
});