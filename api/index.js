import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {router as authRoutes} from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

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