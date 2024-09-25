import { Video } from "../models/Video.js";
import { cloudinary } from "../utils/cloudinary.js";


const getAllVideos = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    try{
        const videos = await Video.find()
            .sort({createdAt: -1})
            .skip((page -1) * limit)
            .limit(limit);

        //const totalVideos = await Video.countDocuments();
        
        if(!videos || videos.length === 0){
            return res.status(400).json({error: 'No Videos Found'});
        }
        return res.status(200).json({videos});
    }
    catch(error){
        console.log('Error fetching videos: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getVideo = async (req, res) => {
    const id = req.params.id;
    try{
        const video = await Video.findById(id);
        if(!video){
            return res.status(400).json({error: 'No Video Found'});
        }
        return res.status(200).json({video});
    }
    catch(error){
        console.log('Error while fetching video: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const incViews = async (req, res) => {
    const id = req.params.id;
    try{
        const video = await Video.findById(id);
        if(!video){
            return res.status(400).json({error: 'No Video Found'});
        }
        video.views += 1;
        await video.save();

        return res.status(200).json({message: 'Success'});
    }
    catch(error){
        console.log('Error while incrementing view: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const userVideos = async (req, res) => {
    const id = req.params.id;
    try{
        const videos = await Video.find({userId: id}).sort({createdAt: -1});

        if(!videos || videos.length === 0){
            return res.status(400).json({error: "No Videos Found"});
        }

        return res.status(200).json({videos});
    }
    catch(error){
        console.error("Error fetching user videos: ", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteVideo = async(req, res) => {
    const id = req.params.id;
    try{
        const video = await Video.findById(id);

        if(!video){
            return res.status(400).json({error: 'Video not found'});
        }

        const videoPublicId = video.videoLink.split('/').pop().split('.')[0];
        const thumbnailPublicId = video.thumbnailLink.split('/').pop().split('.')[0];

        await cloudinary.uploader.destroy(videoPublicId, { resource_type: "video" });
        await cloudinary.uploader.destroy(thumbnailPublicId, { resource_type: "image" });

        await Video.findByIdAndDelete(id);
        return res.status(200).json({message: 'Video Deleted Successfully'});
    }
    catch(error){
        console.error("Error deleting Video: ", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const toggleLike = async (req, res) => {
    const videoId = req.params.id;
    const { userId } = req.body;

    try{
        const video = await Video.findById(videoId);

        if(!video){
            return res.status(400).json({error: 'Video not found'});
        }

        const hasLiked = video.likes.includes(userId);
        if(hasLiked){
            video.likes = video.likes.filter((id) => id.toString() !== userId);
            video.likeCount -= 1;
        }
        else{
            video.likes.push(userId);
            video.likeCount += 1;
        }

        await video.save();
        return res.status(200).json({video: video, liked: !hasLiked});
    }
    catch(error){
        console.error("Error toggling likes: ", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

export { getAllVideos, getVideo, incViews, userVideos, deleteVideo, toggleLike };