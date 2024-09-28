import express from 'express';
import { deleteComment, postComment } from '../controllers/commentController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router
    .post('/:id', protectRoute, postComment)
    .delete('/:id', protectRoute, deleteComment)

export {router};