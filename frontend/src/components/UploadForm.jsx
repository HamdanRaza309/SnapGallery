import React, { useState } from 'react';
import axios from "axios";

const UploadForm = () => {

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!title || !location || !description || !image) {
            alert('Please fill out all fields.');
            return;
        }

        setLoading(true)

        const formData = new FormData();

        formData.append('title', title)
        formData.append('location', location)
        formData.append('description', description)
        formData.append('image', image)

        try {

            const res = await axios.post(
                `/api/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })

            if (res) {
                console.log(res);
                alert('Uploaded successfully')

                // clear form
                setTitle('')
                setLocation('')
                setDescription('')
                setImage(null)

            } else {
                alert('Problem occured while uploading...')
            }

        } catch (error) {
            console.error('Upload Error:', error);
            alert('Upload Failed');
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 mx-auto mt-10">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2"
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2"
            />
            <input
                type="file"
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-2"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 hover:bg-blue-700"
                disabled={loading}>
                {loading ? 'Uploading' : 'Upload'}
            </button>
        </form>
    );
};

export default UploadForm;
