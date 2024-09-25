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
    username:{
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    videoLink:{
        type: String,
        required: true
    },
    thumbnailLink:{
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);

export { Video };