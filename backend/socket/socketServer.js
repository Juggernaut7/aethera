export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a project room
    socket.on('joinProject', (projectId) => {
      socket.join(projectId);
      console.log(`User ${socket.id} joined project: ${projectId}`);
      
      // Notify other users in the project
      socket.to(projectId).emit('userJoined', {
        userId: socket.id,
        projectId 
      });
    });
  
    // Leave a project room
    socket.on('leaveProject', (projectId) => {
      socket.leave(projectId);
      console.log(`User ${socket.id} left project: ${projectId}`);
      
      // Notify other users in the project
      socket.to(projectId).emit('userLeft', {
        userId: socket.id,
        projectId
      });
    });

    // Handle project updates
    socket.on('updateProject', (data) => {
      const { projectId, updateType, updateData, userId } = data;
      
      console.log(`Project update: ${updateType} for project ${projectId}`);
      
      // Broadcast the update to all users in the project room
      socket.to(projectId).emit('projectUpdated', {
        updateType,
        updateData,
        userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle image movement
    socket.on('moveImage', (data) => {
      const { projectId, imageId, position, userId } = data;
      
      socket.to(projectId).emit('imageMoved', {
        imageId,
        position,
        userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle color palette updates
    socket.on('updatePalette', (data) => {
      const { projectId, paletteData, userId } = data;
      
      socket.to(projectId).emit('paletteUpdated', {
        paletteData,
        userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle mood parameter updates
    socket.on('updateMoodParams', (data) => {
      const { projectId, moodParams, userId } = data;
      
      socket.to(projectId).emit('moodParamsUpdated', {
        moodParams,
        userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle user typing indicator
    socket.on('typing', (data) => {
      const { projectId, isTyping, userId } = data;
      
      socket.to(projectId).emit('userTyping', {
        isTyping,
        userId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle chat messages
    socket.on('sendMessage', (data) => {
      const { projectId, message, userId, username } = data;
      
      io.to(projectId).emit('newMessage', {
        message,
        userId,
        username,
        timestamp: new Date().toISOString()
      });
    });

    // Handle user presence
    socket.on('setPresence', (data) => {
      const { projectId, isOnline, userId, username } = data;
      
      socket.to(projectId).emit('userPresence', {
        isOnline,
        userId,
        username,
        timestamp: new Date().toISOString()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      
      // Notify all rooms the user was in
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.to(room).emit('userDisconnected', {
            userId: socket.id,
            timestamp: new Date().toISOString()
          });
        }
      });
    });
  });

  console.log('Socket.IO server initialized');
}; 