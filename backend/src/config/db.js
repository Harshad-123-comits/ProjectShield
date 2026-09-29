const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const hasMongoUri = Boolean(process.env.MONGODB_URI);
    console.log(`MongoDB URI configured: ${hasMongoUri}`);
    
    if (!hasMongoUri) {
      console.warn("MONGODB_URI is not set. Database connections will fail.");
    }

    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    mongoose.set('bufferCommands', false);

    console.log("MongoDB connecting...");
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err.message);
      cached.promise = null;
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log("MongoDB disconnected");
  cached.conn = null;
  cached.promise = null;
});

module.exports = connectDB;
