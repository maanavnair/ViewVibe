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

export { getAllVideos };