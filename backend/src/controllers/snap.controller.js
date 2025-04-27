import { Snap } from '../models/snap.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const uploadSnap = async (req, res) => {
    try {
        // Destructuring title, location, description from req.body and image from req.files
        const { title, location, description } = req.body;

        // console.log('req.body:', req.body);  // Logs all form-data fields
        // console.log('req.file:', req.file);  // Logs the uploaded file

        // console.log(req.file.fieldname);


        // Check if required fields are provided
        if (!title || !location) {
            return res.status(400).json({
                success: false,
                message: 'All fields (title, location, image) are required',
            });
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadOnCloudinary(req.file.path);
        console.log('imagesUrl', imageUrl);

        // Create new snap document in the database
        const snap = await Snap.create({
            title,
            location,
            description,
            image: imageUrl,
        });

        return res.status(201).json({
            success: true,
            message: 'Snap uploaded successfully',
            data: snap,
        });
    } catch (error) {
        console.error('Error uploading snap:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
};

const fetchAllSnaps = async (req, res) => {
    try {
        const allSnaps = await Snap.find();

        if (!allSnaps || allSnaps.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No snaps found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Snaps fetched successfully',
            data: allSnaps,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch snaps',
            error: error.message,
        });
    }
};


export { uploadSnap, fetchAllSnaps };
