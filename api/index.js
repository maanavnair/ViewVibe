import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {router as authRoutes} from './routes/authRoutes.js';
import { router as uploadRoutes } from './routes/uploadRoutes.js'
import { router as videoRoutes } from './routes/videoRoutes.js'
import { router as commentRoutes } from './routes/commentRoutes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/comment', commentRoutes);

//testing api
app.get('/', (req, res) => {
    res.json("API Working");
})

//connecting to database
mongoose.connect(process.env.DB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server Started at ', process.env.PORT);
    })
})
.catch((err) => {
    console.log(err);
})