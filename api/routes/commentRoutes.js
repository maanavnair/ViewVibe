import express from 'express';
import { deleteComment, postComment } from '../controllers/commentController.js';

const router = express.Router();

router
    .post('/:id', postComment)
    .delete(':/id', deleteComment)

export {router};