import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  const connectWithRetry = async () => {
    try {
      // Check if MONGO_URI exists
      if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI not found in environment variables');
        return null;
      }

      console.log('🔄 Attempting to connect to MongoDB...');
      
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        // Simplified connection options for better compatibility
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        retryWrites: true,
        w: 'majority',
        // Add DNS resolution timeout
        connectTimeoutMS: 10000,
        // Disable server discovery and monitoring
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        }
      });
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retryCount++;
      console.error(`❌ MongoDB connection attempt ${retryCount} failed:`, error.message);
      
      // Provide specific error guidance
      if (error.message.includes('whitelist')) {
        console.error('💡 Solution: Add your IP to MongoDB Atlas whitelist');
        console.error('   Visit: https://cloud.mongodb.com → Network Access → Add IP');
      } else if (error.message.includes('DNS') || error.message.includes('getaddrinfo')) {
        console.error('💡 Solution: Check your internet connection and DNS settings');
      } else if (error.message.includes('authentication')) {
        console.error('💡 Solution: Check your MongoDB username/password');
      }
      
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying connection in ${retryCount * 2} seconds... (${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
        return connectWithRetry();
      } else {
        console.error(`⚠️ MongoDB connection failed after ${maxRetries} attempts.`);
        console.error('💡 Running in demo mode without database persistence.');
        console.error('💡 Core features (AI, Images) will still work!');
        return null;
      }
    }
  };

  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log('🎉 Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from MongoDB');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
      }
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  return connectWithRetry();
};

export default connectDB; 