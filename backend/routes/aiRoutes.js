import express from 'express';
import {
  generatePalette,
  generateImageQuery,
  proxyHuggingFace
} from '../controllers/aiController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All AI routes are protected
router.use(authMiddleware);

// AI routes
router.post('/generate-palette', generatePalette);
router.post('/generate-image-query', generateImageQuery);
router.post('/chatbot', proxyHuggingFace);

export default router; 