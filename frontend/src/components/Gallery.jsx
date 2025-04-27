import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm';
import Modal from './Modal';
import axios from 'axios';

function Gallery() {
    const [allSnaps, setAllSnaps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSnaps = async () => {
            try {
                const res = await axios.get(`/api/v1/snap/get-snaps`);
                setAllSnaps(res.data.data);
            } catch (error) {
                alert('Something went wrong while fetching snaps');
            }
        };

        fetchSnaps();
    }, []);

    const handleImageUpload = (newSnap) => {
        setAllSnaps((prevSnaps) => [...prevSnaps, newSnap]);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-100 text-black hover:bg-blue-200 p-3 rounded-md mb-6 transition-colors duration-200"
            >
                Add New Snap
            </button>
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {allSnaps.map((snap, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-lg font-semibold mb-2">{snap.title}</h2>
                        <h2 className="text-lg font-semibold mb-2">{snap.location}</h2>
                        <h2 className="text-lg font-semibold mb-2">{snap.description}</h2>
                        <img src={snap.imageUrl} alt={snap.title} className="w-full h-40 object-cover rounded" />
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UploadForm onImageUpload={handleImageUpload} />
            </Modal>

            <footer className="mt-10 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Your Gallery. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Gallery;
