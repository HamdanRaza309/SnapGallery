import express from 'express';
import { upload } from '../middlewares//multer.middleware.js';
import { uploadSnap, fetchAllSnaps } from '../controllers/snap.controller.js';

const router = express.Router();

// POST route for snapUpload with multer file upload handling
router.route('/upload').post(
    upload.single('image'), // Use multer's single file upload handler
    uploadSnap // The controller function
);

router.route('/get-snaps').get(fetchAllSnaps)

export default router;