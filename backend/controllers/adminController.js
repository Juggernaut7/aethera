import User from '../models/User.js';
import Project from '../models/Project.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: skip + users.length < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all projects associated with the user
    await Project.deleteMany({ userId: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.json({ message: 'User and associated projects deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// Ban/Unban a user (admin only)
export const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;

    // Prevent admin from banning themselves
    if (id === req.user.userId) {
      return res.status(400).json({ message: 'Cannot ban your own account' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isBanned },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${isBanned ? 'banned' : 'unbanned'} successfully`,
      user
    });

  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ message: 'Server error updating user ban status' });
  }
};

// Verify/Unverify a user (admin only)
export const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
      user
    });

  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ message: 'Server error updating user verification status' });
  }
};

// Get admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const publicProjects = await Project.countDocuments({ isPublic: true });
    const bannedUsers = await User.countDocuments({ isBanned: true });

    // Get recent activity
    const recentUsers = await User.find()
      .select('username email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProjects = await Project.find()
      .populate('userId', 'username')
      .select('name userId createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalProjects,
        publicProjects,
        bannedUsers
      },
      recentActivity: {
        users: recentUsers,
        projects: recentProjects
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
}; 