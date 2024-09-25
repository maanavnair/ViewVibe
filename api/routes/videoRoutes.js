import express from 'express';
import { deleteVideo, getAllVideos, getVideo, incViews, toggleLike, userVideos } from '../controllers/videoController.js';

const router = express.Router();

router
    .get('/', getAllVideos)
    .get('/:id', getVideo)
    .post('/views/:id', incViews)
    .get('/uservideos/:id', userVideos)
    .post('/likes/:id', toggleLike)
    .delete('/deletevideo/:id', deleteVideo)


export { router };