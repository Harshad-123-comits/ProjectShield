const mongoose = require('mongoose');
const connectDB = require('../config/db');

const dbCheck = async (req, res, next) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }
    next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Database unavailable",
      errorCode: "DATABASE_UNAVAILABLE"
    });
  }
};

module.exports = dbCheck;
