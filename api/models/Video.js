import mongoose, { Types } from "mongoose";

const videoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoLink:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);

export { Video };