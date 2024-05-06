import express from 'express';
import { upload } from '../controllers/uploadController.js';
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router();

router
.post('/', protectRoute, upload);

export { router };