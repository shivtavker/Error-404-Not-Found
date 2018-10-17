const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const mlDataRoutes = require('./routes/ml-data');

app.use(bodyparser.json());

// Adding Headers to the Request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Security Vulnerability To be Modified Later
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

app.use('/api/mldata', mlDataRoutes);
module.exports = app;
