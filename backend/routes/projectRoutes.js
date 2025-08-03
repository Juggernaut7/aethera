import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getPublicProjects
} from '../controllers/projectController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All project routes are protected
router.use(authMiddleware);

// Project CRUD operations
router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router; 