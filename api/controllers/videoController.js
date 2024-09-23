import { Video } from "../models/Video.js";


const getAllVideos = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

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

export { getAllVideos, getVideo, incViews };