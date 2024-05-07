import express from 'express';
import { uploadFunc } from '../controllers/uploadController.js';
import protectRoute from '../middleware/protectRoute.js'
import { upload } from '../middleware/multer.js';

const router = express.Router();

router
.post('/', upload.single('video'), uploadFunc);

export { router };