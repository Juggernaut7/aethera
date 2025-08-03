import Project from '../models/Project.js';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, moodParams, paletteData, imageUrls, isPublic } = req.body;

    const project = new Project({
      userId: req.user.userId,
      name,
      moodParams,
      paletteData,
      imageUrls: imageUrls || [],
      isPublic: isPublic || false
    });

    await project.save();
    await project.populate('userId', 'username avatar');

    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error creating project' });
  }
};

// Get all projects for the current user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

// Get a specific project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate('userId', 'username avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns the project or if it's public
    if (project.userId._id.toString() !== req.user.userId && !project.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ message: 'Server error fetching project' });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, moodParams, paletteData, imageUrls, isPublic } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns the project
    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (moodParams !== undefined) updateData.moodParams = moodParams;
    if (paletteData !== undefined) updateData.paletteData = paletteData;
    if (imageUrls !== undefined) updateData.imageUrls = imageUrls;
    if (isPublic !== undefined) updateData.isPublic = isPublic;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'username avatar');

    res.json({
      message: 'Project updated successfully',
      project: updatedProject
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error updating project' });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns the project
    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Project.findByIdAndDelete(id);

    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};

// Get public projects (for gallery)
export const getPublicProjects = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const projects = await Project.find({ isPublic: true })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments({ isPublic: true });

    res.json({
      projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        hasNext: skip + projects.length < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get public projects error:', error);
    res.status(500).json({ message: 'Server error fetching public projects' });
  }
}; 