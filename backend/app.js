const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/analytics', require('./src/routes/analytics'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

module.exports = app;
