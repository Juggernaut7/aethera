import express from 'express';
import {
  getAllUsers,
  deleteUser,
  banUser,
  verifyUser,
  getDashboardStats
} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authMiddleware);
router.use(adminAuthMiddleware);

// Admin routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/ban', banUser);
router.put('/users/:id/verify', verifyUser);
router.get('/dashboard', getDashboardStats);

export default router; 