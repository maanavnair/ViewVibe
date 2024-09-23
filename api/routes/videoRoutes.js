import express from 'express';
import { getAllVideos, getVideo, incViews } from '../controllers/videoController.js';

const router = express.Router();

router
    .get('/', getAllVideos)
    .get('/:id', getVideo)
    .post('/views/:id', incViews)


export { router };