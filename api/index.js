import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

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