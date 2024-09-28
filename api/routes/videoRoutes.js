import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { deleteVideo, getAllVideos, getVideo, incViews, toggleLike, userVideos } from '../controllers/videoController.js';

const router = express.Router();

router
    .get('/', protectRoute, getAllVideos)
    .get('/:id', protectRoute, getVideo)
    .post('/views/:id', protectRoute, incViews)
    .get('/uservideos/:id', protectRoute, userVideos)
    .post('/likes/:id', protectRoute, toggleLike)
    .delete('/deletevideo/:id', protectRoute, deleteVideo)


export { router };