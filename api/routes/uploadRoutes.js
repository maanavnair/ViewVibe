import express from 'express';
import { uploadFunc } from '../controllers/uploadController.js';
import { upload } from '../middleware/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, upload, uploadFunc);

export { router };