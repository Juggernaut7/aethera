import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Send, 
  Heart, 
  ThumbsUp, 
  Eye,
  UserPlus,
  Crown,
  Sparkles,
  Clock
} from 'lucide-react';
import Button from '../ui/Button';

const CollaborationPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Alex Designer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Love this color palette! 🎨',
      timestamp: '2 min ago',
      isOwner: true
    },
    {
      id: 2,
      user: 'Sarah Creative',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      message: 'The mood board is perfect for our project',
      timestamp: '5 min ago',
      isOwner: false
    },
    {
      id: 3,
      user: 'Mike Developer',
      avatar: 'https://ui-avatars.com/api/?name=Mike&background=4facfe&color=fff&size=40',
      message: 'Can we export this to Figma?',
      timestamp: '8 min ago',
      isOwner: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([
    {
      id: 1,
      name: 'Alex Designer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      status: 'online',
      isOwner: true,
      activity: 'Editing palette'
    },
    {
      id: 2,
      name: 'Sarah Creative',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      status: 'online',
      isOwner: false,
      activity: 'Viewing mood board'
    },
    {
      id: 3,
      name: 'Mike Developer',
      avatar: 'https://ui-avatars.com/api/?name=Mike&background=4facfe&color=fff&size=40',
      status: 'online',
      isOwner: false,
      activity: 'Adding comments'
    }
  ]);

  const [likes, setLikes] = useState(12);
  const [views, setViews] = useState(47);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setViews(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=667eea&color=fff&size=40',
        message: newMessage,
        timestamp: 'Just now',
        isOwner: true
      };
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.button
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-md transition-all duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Collaboration
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {activeUsers.length} active collaborators
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {activeUsers.length}
            </span>
          </div>
        </div>
      </motion.button>

      {/* Active Users */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>Active Collaborators</span>
        </h4>
        
        <div className="space-y-2">
          {activeUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white dark:border-gray-800`} />
                {user.isOwner && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </span>
                  {user.isOwner && (
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.activity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className="flex items-center justify-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
          onClick={handleLike}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {likes}
          </span>
        </motion.button>
        
        <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Eye className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {views}
          </span>
        </div>
      </div>

      {/* Chat Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Live Chat</span>
            </h4>
            
            {/* Messages */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex space-x-3 ${message.isOwner ? 'flex-row-reverse space-x-reverse' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-6 h-6 rounded-full flex-shrink-0"
                  />
                  <div className={`max-w-xs ${message.isOwner ? 'text-right' : ''}`}>
                    <div className={`inline-block p-2 rounded-lg text-sm ${
                      message.isOwner 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      {message.message}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button
                type="submit"
                size="sm"
                icon={Send}
                disabled={!newMessage.trim()}
                className="flex-shrink-0"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Button */}
      <Button
        variant="outline"
        size="sm"
        icon={UserPlus}
        className="w-full"
      >
        Invite Collaborators
      </Button>
    </div>
  );
};

export default CollaborationPanel; 