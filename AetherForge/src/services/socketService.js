import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  // Connect to Socket.IO server
  connect() {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'https://aethera.onrender.com', {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      this.isConnected = false;
    });
  }

  // Disconnect from Socket.IO server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join a project room
  joinProject(projectId, userId, username) {
    if (!this.socket) return;

    this.socket.emit('joinProject', projectId);
    this.socket.emit('setPresence', {
      projectId,
      isOnline: true,
      userId,
      username
    });
  }

  // Leave a project room
  leaveProject(projectId, userId, username) {
    if (!this.socket) return;

    this.socket.emit('leaveProject', projectId);
    this.socket.emit('setPresence', {
      projectId,
      isOnline: false,
      userId,
      username
    });
  }

  // Update project data
  updateProject(projectId, updateType, updateData, userId) {
    if (!this.socket) return;

    this.socket.emit('updateProject', {
      projectId,
      updateType,
      updateData,
      userId
    });
  }

  // Move an image
  moveImage(projectId, imageId, position, userId) {
    if (!this.socket) return;

    this.socket.emit('moveImage', {
      projectId,
      imageId,
      position,
      userId
    });
  }

  // Update palette
  updatePalette(projectId, paletteData, userId) {
    if (!this.socket) return;

    this.socket.emit('updatePalette', {
      projectId,
      paletteData,
      userId
    });
  }

  // Update mood parameters
  updateMoodParams(projectId, moodParams, userId) {
    if (!this.socket) return;

    this.socket.emit('updateMoodParams', {
      projectId,
      moodParams,
      userId
    });
  }

  // Send chat message
  sendMessage(projectId, message, userId, username) {
    if (!this.socket) return;

    this.socket.emit('sendMessage', {
      projectId,
      message,
      userId,
      username
    });
  }

  // Set typing indicator
  setTyping(projectId, isTyping, userId) {
    if (!this.socket) return;

    this.socket.emit('typing', {
      projectId,
      isTyping,
      userId
    });
  }

  // Listen for project updates
  onProjectUpdate(callback) {
    if (!this.socket) return;

    this.socket.on('projectUpdated', callback);
  }

  // Listen for image movement
  onImageMoved(callback) {
    if (!this.socket) return;

    this.socket.on('imageMoved', callback);
  }

  // Listen for palette updates
  onPaletteUpdated(callback) {
    if (!this.socket) return;

    this.socket.on('paletteUpdated', callback);
  }

  // Listen for mood parameter updates
  onMoodParamsUpdated(callback) {
    if (!this.socket) return;

    this.socket.on('moodParamsUpdated', callback);
  }

  // Listen for new messages
  onNewMessage(callback) {
    if (!this.socket) return;

    this.socket.on('newMessage', callback);
  }

  // Listen for user presence
  onUserPresence(callback) {
    if (!this.socket) return;

    this.socket.on('userPresence', callback);
  }

  // Listen for user joined
  onUserJoined(callback) {
    if (!this.socket) return;

    this.socket.on('userJoined', callback);
  }

  // Listen for user left
  onUserLeft(callback) {
    if (!this.socket) return;

    this.socket.on('userLeft', callback);
  }

  // Listen for user typing
  onUserTyping(callback) {
    if (!this.socket) return;

    this.socket.on('userTyping', callback);
  }

  // Listen for user disconnected
  onUserDisconnected(callback) {
    if (!this.socket) return;

    this.socket.on('userDisconnected', callback);
  }

  // Remove all listeners
  removeAllListeners() {
    if (!this.socket) return;

    this.socket.removeAllListeners();
  }

  // Get connection status
  getConnectionStatus() {
    return this.isConnected;
  }
}

// Create and export a singleton instance
const socketService = new SocketService();
export default socketService; 