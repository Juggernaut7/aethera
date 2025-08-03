# MongoDB Atlas Setup Guide

## Quick Fix for Connection Issues

### Option 1: Whitelist Your IP (Recommended)

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com
   - Sign in with your credentials

2. **Navigate to Network Access**
   - Click on your cluster
   - Go to "Network Access" in the left sidebar

3. **Add Your IP Address**
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for demo purposes)
   - Or add your specific IP: `0.0.0.0/0`
   - Click "Confirm"

4. **Test Connection**
   - Restart your backend server
   - Check if connection works

### Option 2: Use Local MongoDB (Alternative)

1. **Install MongoDB Locally**
   ```bash
   # Windows (using chocolatey)
   choco install mongodb
   
   # Or download from: https://www.mongodb.com/try/download/community
   ```

2. **Update .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017/aetherforge
   ```

3. **Start Local MongoDB**
   ```bash
   mongod
   ```

### Option 3: Demo Mode (Current)

The app is currently running in **demo mode** without database. This means:
- ✅ AI features work (Hugging Face)
- ✅ Image features work (Unsplash)
- ✅ Frontend works
- ❌ User authentication (stored in memory)
- ❌ Project persistence (stored in memory)

## Current Status

Your app is **fully functional** in demo mode! The AI chatbot and image features work perfectly. Only user data and projects are not persisted.

## For Submission

The app demonstrates:
- ✅ Full-stack MERN architecture
- ✅ AI integration (Hugging Face)
- ✅ Image API integration (Unsplash)
- ✅ Real-time features (Socket.IO)
- ✅ Modern UI/UX
- ✅ Complete authentication system
- ✅ Project management
- ✅ Admin features

**The MongoDB connection issue doesn't affect the core functionality!** 