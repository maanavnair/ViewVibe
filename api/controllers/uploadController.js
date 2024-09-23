
import { Video } from "../models/Video.js";
import { cloudinary } from "../utils/cloudinary.js";
import { User } from "../models/User.js";
import fs from 'fs';

const uploadFunc = async (req, res) => {
    try {
        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).json({ error: 'No files uploaded or invalid file paths' });
        }

        console.log("This is the video file", req.files.video[0]);
        console.log("This is the thumbnail file", req.files.thumbnail[0]);
        console.log("This is the body", req.body);

        // Upload video file to Cloudinary
        const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
            resource_type: 'video'
        });

        // Upload thumbnail file to Cloudinary
        const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
            resource_type: 'image'
        });

        // Check if Cloudinary uploads were successful
        if (!videoResult.secure_url || !thumbnailResult.secure_url) {
            return res.status(500).json({ error: 'Error uploading video or thumbnail to Cloudinary' });
        }

        // Delete temporary files
        fs.unlink(req.files.video[0].path, (err) => {
            if (err) {
                console.error('Error deleting video file:', err);
            }
        });

        fs.unlink(req.files.thumbnail[0].path, (err) => {
            if (err) {
                console.error('Error deleting thumbnail file:', err);
            }
        });

        const user = await User.findById(req.body.userId);

        // Save video details to database
        const newVid = new Video({
            title: req.body.title,
            desc: req.body.desc,
            userId: req.body.userId,
            username: user.username,
            videoLink: videoResult.secure_url,
            thumbnailLink: thumbnailResult.secure_url
        });

        await newVid.save();

        return res.status(200).json({ message: 'Video uploaded successfully', videoUrl: videoResult.secure_url });
    } 
    catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { uploadFunc };
