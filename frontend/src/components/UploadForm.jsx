import React, { useState } from 'react';
import axios from "axios";

const UploadForm = ({ onImageUpload }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !location || !description || !image) {
            alert('Please fill out all fields.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const res = await axios.post(`/api/v1/snap/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res) {
                alert('Uploaded successfully');
                onImageUpload(res.data.data);
                setTitle('');
                setLocation('');
                setDescription('');
                setImage(null);
            } else {
                alert('Problem occurred while uploading...');
            }
        } catch (error) {
            alert('Upload Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">Upload Your Content</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-3"
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded-md p-3"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-3 resize-none"
                rows="4"
            />
            <input
                type="file"
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                className="border border-gray-300 rounded-md p-3"
            />
            <button
                type="submit"
                className={`bg-green-100 text-green-800 hover:bg-green-200 p-3 rounded-md transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </form>
    );
};

export default UploadForm;
