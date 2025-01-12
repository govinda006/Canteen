const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// ...existing code for routes...

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
