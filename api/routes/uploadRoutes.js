import express from 'express';
import { uploadFunc } from '../controllers/uploadController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post('/', upload, uploadFunc);

export { router };