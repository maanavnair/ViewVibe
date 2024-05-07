import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    videoLink:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);

export { Video };