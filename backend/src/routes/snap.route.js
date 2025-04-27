import express from 'express';
import { upload } from '../utils/multer.middleware.js';
import { snapUpload } from '../controllers/snap.controller.js';

const router = express.Router();

// POST route for snapUpload with multer file upload handling
router.route('/snapUpload').post(
    upload.single('image'), // Use multer's single file upload handler
    snapUpload // The controller function
);

export default router;
