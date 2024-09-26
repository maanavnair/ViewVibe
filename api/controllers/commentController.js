import { Comment } from "../models/Comment.js";

const postComment = async (req, res) => {
    try{
        const videoId = req.params.id;
        const { userId, content, username }  = req.body;
        const newComment = new Comment({
            videoId,
            userId,
            content,
            username
        });
        
        await newComment.save();
        res.status(200).json({message: 'Success'});
    }
    catch(error){
        console.log("Error creating comment: ", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteComment = async (req, res) => {
    try{
        const id = req.params.id;
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(400).json({error: 'Comment Not Found'});
        }
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({message: 'Comment Deleted Successfully'});
    }
    catch(error){
        console.log("Error deleting comment", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

export { postComment, deleteComment };