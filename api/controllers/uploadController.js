import { Video } from "../models/Video.js";
import { cloudinary } from "../utils/cloudinary.js";
import fs from 'fs';
import path from 'path';

const uploadFunc = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No file uploaded or invalid file path' });
        }

        console.log("This is the file", req.file);
        console.log("This is the bodyr", req.body);
        //upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video'
        });

        // Check if Cloudinary upload was successful
        if (!result || !result.secure_url) {
            return res.status(500).json({ error: 'Error uploading video to Cloudinary' });
        }

        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        const newVid = new Video({
            title: req.body.title,
            desc: req.body.desc,
            userId: req.body.userId,
            videoLink: result.secure_url
        });
        newVid.save()
        .then(savedVideo => {
            if (savedVideo) {
                return res.status(200).json({ message: 'Video uploaded successfully', videoUrl: result.secure_url });
            } else {
                return res.status(400).json({ error: "Couldn't save data to database" });
            }
        })
        .catch(err => {
            console.error('Error saving video to database:', err);
            return res.status(500).json({ error: 'Error saving video to database' });
        });
    } 
    catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { uploadFunc };
