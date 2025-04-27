import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm';
import Modal from './Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import chevron icons

function Gallery() {
    const [allSnaps, setAllSnaps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [snapsPerPage] = useState(3); // Number of snaps per page

    useEffect(() => {
        const fetchSnaps = async () => {
            try {
                const res = await axios.get(`/api/v1/snap/get-snaps`);
                console.log(res.data.data);
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

    // Get the current snaps based on the page
    const indexOfLastSnap = currentPage * snapsPerPage;
    const indexOfFirstSnap = indexOfLastSnap - snapsPerPage;
    const currentSnaps = allSnaps.slice(indexOfFirstSnap, indexOfLastSnap);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-5xl font-bold text-center mb-6">Gallery</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white hover:bg-blue-600 p-3 font-bold rounded-md mb-6 transition-colors duration-200"
            >
                Add New Snap
            </button>
            <div className="relative w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {/* Left Pagination Button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-300 text-white p-3 rounded-full shadow-lg hover:bg-blue-400 transition duration-300"
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </button>

                {/* Gallery Cards */}
                {currentSnaps.map((snap, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{snap.title}</h2>
                        <h3 className="text-lg text-gray-600 mb-4">{snap.location}</h3>
                        <img
                            src={snap.image}
                            alt={snap.title}
                            className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <p className="text-gray-700 text-base text-center mb-4">{snap.description}</p>
                    </div>
                ))}

                {/* Right Pagination Button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-300 text-white p-3 m- rounded-full shadow-lg hover:bg-blue-400 transition duration-300"
                    disabled={currentPage === Math.ceil(allSnaps.length / snapsPerPage)}
                >
                    <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </button>
            </div>

            {/* Pagination Controls at Bottom */}
            <div className="flex justify-center space-x-4 mb-10">
                {Array.from({ length: Math.ceil(allSnaps.length / snapsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`p-3 rounded-full ${currentPage === index + 1 ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'} transition duration-300`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal for Upload Form */}
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
