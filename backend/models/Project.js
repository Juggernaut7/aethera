import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  moodParams: {
    energy: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    temperature: {
      type: String,
      enum: ['warm', 'neutral', 'cool'],
      default: 'neutral'
    },
    theme: {
      type: String,
      trim: true,
      default: ''
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  paletteData: {
    primaryColor: {
      type: String,
      default: '#000000'
    },
    secondaryColor: {
      type: String,
      default: '#ffffff'
    },
    accentColor: {
      type: String,
      default: '#ff6b6b'
    },
    neutralColors: [{
      type: String
    }]
  },
  imageUrls: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ userId: 1 });
projectSchema.index({ isPublic: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project; 