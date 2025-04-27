import { Snap } from '../models/snap.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const snapUpload = async (req, res) => {
    try {
        // Destructuring title, location, description from req.body and image from req.files
        const { title, location, description } = req.body;
        const { image } = req.files;

        // Check if required fields are provided
        if (!title || !location || !image) {
            return res.status(400).json({
                success: false,
                message: 'All fields (title, location, image) are required',
            });
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadOnCloudinary(image.path);

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

export { snapUpload };
