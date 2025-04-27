import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localImagePath) => {
    if (!localImagePath) return null;

    try {
        const res = await cloudinary.uploader.upload(
            localImagePath,
            {
                resource_type: 'auto'
            })

        console.log("Image uploaded succesfully to Cloudinary:", res.url);

        await fs.unlink(localImagePath)
        return res.url
    } catch (error) {
        console.error('Cloudinary upload error:', error);

        // Remove the temporary local file
        try {
            await fs.unlink(localFilePath);
            console.log('Local temporary file removed successfully.');
        } catch (unlinkError) {
            console.error('Error removing local temporary file:', unlinkError);
        }

        return null;
    }
}

export { uploadOnCloudinary }