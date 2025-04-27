import React from 'react';
import UploadForm from './UploadForm';

function Gallery() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Gallery</h1>
            <p className="text-gray-600 mb-2 text-center">Upload your images and share your moments with the world!</p>
            <UploadForm />

            <footer className="mt-10 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Your Gallery. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Gallery;