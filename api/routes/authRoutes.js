import express from 'express';
import { login, logout, signup } from '../controllers/authControllers.js';

const router = express.Router();

router
    .post('/signup', signup)
    .post('/login', login)
    .post('/logout', logout);

export {router};