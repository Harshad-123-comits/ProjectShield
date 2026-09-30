const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const dbCheck = require('./src/middleware/dbCheck');
const mongoose = require('mongoose');

// Routes
app.use('/api/projects', dbCheck, require('./src/routes/projects'));
app.use('/api/analytics', dbCheck, require('./src/routes/analytics'));
app.use('/api/alerts', dbCheck, require('./src/routes/alerts'));
app.use('/api/gis', dbCheck, require('./src/routes/gis'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  try {
    const connectDB = require('./src/config/db');
    await connectDB();
    
    if (mongoose.connection.readyState === 1) {
      res.json({
        success: true,
        connected: true,
        readyState: 1,
        database: mongoose.connection.name,
        host: mongoose.connection.host
      });
    } else {
      throw new Error("Not ready");
    }
  } catch (error) {
    res.status(503).json({
      success: false,
      connected: false,
      readyState: mongoose.connection.readyState,
      database: "paimana",
      errorCode: "DATABASE_UNAVAILABLE"
    });
  }
});

module.exports = app;
