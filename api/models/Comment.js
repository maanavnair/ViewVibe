import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };