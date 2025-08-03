import express from 'express';
import { getUnsplashImages, getRandomImages } from '../controllers/imageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All image routes are protected
router.use(authMiddleware);

// Image routes
router.get('/unsplash', getUnsplashImages);
router.get('/random', getRandomImages);

export default router; 