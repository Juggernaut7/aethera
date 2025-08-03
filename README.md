# AetherForge - AI-Powered Mood Board Studio

A full-stack MERN application for creating beautiful, AI-powered mood boards with real-time collaboration.

## 🚀 Features

- **AI-Powered Mood Boards** - Generate creative content with Hugging Face AI
- **Real-time Collaboration** - Work together with Socket.IO
- **Unsplash Integration** - High-quality images for your projects
- **Smart Color Palettes** - AI-generated color schemes
- **User Authentication** - Secure JWT-based auth
- **Project Management** - Save and organize your mood boards
- **Admin Dashboard** - User management and analytics

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database & ODM
- **Socket.IO** - Real-time communication
- **JWT** & **bcryptjs** - Authentication & security
- **Axios** - HTTP client for external APIs

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Toastify** - Notifications

### AI & External APIs
- **Hugging Face** - AI chatbot
- **Unsplash** - Image service
- **MongoDB Atlas** - Cloud database

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create `.env` file with:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/aetherforge
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

4. **Start backend server:**
   ```