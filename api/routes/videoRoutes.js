import express from 'express';
import { getAllVideos } from '../controllers/videoController.js';

const router = express.Router();

router
    .get('/', getAllVideos);


export { router };