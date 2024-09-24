import express from 'express';
import { deleteVideo, getAllVideos, getVideo, incViews, userVideos } from '../controllers/videoController.js';

const router = express.Router();

router
    .get('/', getAllVideos)
    .get('/:id', getVideo)
    .post('/views/:id', incViews)
    .get('/uservideos/:id', userVideos)
    .delete('/deletevideo/:id', deleteVideo)


export { router };