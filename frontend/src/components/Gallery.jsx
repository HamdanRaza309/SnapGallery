// import React, { useEffect, useState } from 'react';
// import UploadForm from './UploadForm';
// import Modal from './Modal';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import chevron icons

// function Gallery() {
//     const [allSnaps, setAllSnaps] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1); // Current page
//     const [snapsPerPage] = useState(3); // Number of snaps per page

//     useEffect(() => {
//         const fetchSnaps = async () => {
//             try {
//                 const res = await axios.get(
//                     `${import.meta.env.VITE_API_BASE_URL}/api/v1/snap/get-snaps`,
//                     {
//                         withCredentials: true
//                     }
//                 );
//                 console.log(res.data.data);
//                 setAllSnaps(res.data.data);
//             } catch (error) {
//                 alert('Something went wrong while fetching snaps');
//             }
//         };

//         fetchSnaps();
//     }, []);

//     const handleImageUpload = (newSnap) => {
//         setAllSnaps((prevSnaps) => [...prevSnaps, newSnap]);
//         setIsModalOpen(false);
//     };

//     // Get the current snaps based on the page
//     const indexOfLastSnap = currentPage * snapsPerPage;
//     const indexOfFirstSnap = indexOfLastSnap - snapsPerPage;
//     const currentSnaps = allSnaps.slice(indexOfFirstSnap, indexOfLastSnap);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//             <h1 className="text-5xl font-bold text-center mb-6">Gallery</h1>
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-500 text-white hover:bg-blue-600 p-3 font-bold rounded-md mb-6 transition-colors duration-200"
//             >
//                 Add New Snap
//             </button>
//             <div className="relative w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//                 {/* Left Pagination Button */}
//                 <button
//                     onClick={() => paginate(currentPage - 1)}
//                     className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-300 text-white p-3 rounded-full shadow-lg hover:bg-blue-400 transition duration-300"
//                     disabled={currentPage === 1}
//                 >
//                     <FontAwesomeIcon icon={faChevronLeft} size="lg" />
//                 </button>

//                 {/* Gallery Cards */}
//                 {currentSnaps.map((snap, index) => (
//                     <div
//                         key={index}
//                         className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
//                     >
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{snap.title}</h2>
//                         <h3 className="text-lg text-gray-600 mb-4">{snap.location}</h3>
//                         <img
//                             src={snap.image}
//                             alt={snap.title}
//                             className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
//                         />
//                         <p className="text-gray-700 text-base text-center mb-4">{snap.description}</p>
//                     </div>
//                 ))}

//                 {/* Right Pagination Button */}
//                 <button
//                     onClick={() => paginate(currentPage + 1)}
//                     className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-300 text-white p-3 m- rounded-full shadow-lg hover:bg-blue-400 transition duration-300"
//                     disabled={currentPage === Math.ceil(allSnaps.length / snapsPerPage)}
//                 >
//                     <FontAwesomeIcon icon={faChevronRight} size="lg" />
//                 </button>
//             </div>

//             {/* Pagination Controls at Bottom */}
//             <div className="flex justify-center space-x-4 mb-10">
//                 {Array.from({ length: Math.ceil(allSnaps.length / snapsPerPage) }, (_, index) => (
//                     <button
//                         key={index + 1}
//                         onClick={() => paginate(index + 1)}
//                         className={`p-3 rounded-full ${currentPage === index + 1 ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'} transition duration-300`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>

//             {/* Modal for Upload Form */}
//             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//                 <UploadForm onImageUpload={handleImageUpload} />
//             </Modal>

//             <footer className="mt-10 text-center text-gray-500">
//                 <p>&copy; {new Date().getFullYear()} Your Gallery. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }

// export default Gallery;

import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm';
import Modal from './Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faCameraRetro, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
    const [allSnaps, setAllSnaps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [snapsPerPage] = useState(6);

    // Color palette variables
    const colors = {
        primary: '#3D365C',
        secondary: '#7C4585',
        accent: '#210F37',
        background: '#161179',
        highlight: '#F8B55F',
        textLight: '#FFFFFF',
        textDark: '#333333'
    };

    useEffect(() => {
        const fetchSnaps = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/snap/get-snaps`,
                    { withCredentials: true }
                );
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

    const indexOfLastSnap = currentPage * snapsPerPage;
    const indexOfFirstSnap = indexOfLastSnap - snapsPerPage;
    const currentSnaps = allSnaps.slice(indexOfFirstSnap, indexOfLastSnap);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="font-sans min-h-screen" style={{ backgroundColor: colors.background }}>
            {/* Hero Section */}
            <section className="w-full min-h-[90vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 flex items-center gap-4">
                    <FontAwesomeIcon icon={faCameraRetro} className="text-yellow-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                        Snap Gallery
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
                    Where every memory becomes a masterpiece
                </p>
                <a
                    href="#gallery"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                        backgroundColor: colors.primary,
                        color: colors.textLight,
                        boxShadow: `0 4px 15px rgba(248, 181, 95, 0.3)`
                    }}
                >
                    Explore Now
                    <FontAwesomeIcon icon={faArrowDown} className="animate-bounce" />
                </a>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-20 px-4" style={{ backgroundColor: colors.background }}>
                {/* Gallery Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center justify-center gap-4">
                        <FontAwesomeIcon icon={faCameraRetro} className="text-yellow-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                            Snaps Collection
                        </span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Explore beautiful memories captured and shared by our amazing community!
                    </p>
                </div>

                {/* Upload New Snap Button */}
                <div className="flex justify-center mb-16">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.textLight,
                            boxShadow: `0 4px 15px rgba(248, 181, 95, 0.3)`
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add New Snap
                    </button>
                </div>

                {/* Gallery Grid */}
                <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 px-6">

                    {/* Left Pagination Button */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 rounded-full shadow-md transition-all duration-300 z-10 hover:scale-110"
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.textLight,
                            opacity: currentPage === 1 ? 0.5 : 1,
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    </button>

                    {/* Gallery Items */}
                    {currentSnaps.map((snap, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.textLight,
                                border: `2px solid ${colors.highlight}`
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: colors.highlight }}>
                                {snap.title}
                            </h2>
                            <h3 className="text-md font-medium mb-5" style={{ color: colors.textLight }}>
                                {snap.location}
                            </h3>
                            <img
                                src={snap.image}
                                alt={snap.title}
                                className="w-full h-60 object-cover rounded-lg mb-5 shadow-inner border-2 border-gray-200"
                            />
                            <p className="text-base text-center mb-4" style={{ color: colors.textLight }}>
                                {snap.description}
                            </p>
                        </div>
                    ))}

                    {/* Right Pagination Button */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 rounded-full shadow-md transition-all duration-300 z-10 hover:scale-110"
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.textLight,
                            opacity: currentPage === Math.ceil(allSnaps.length / snapsPerPage) ? 0.5 : 1,
                            cursor: currentPage === Math.ceil(allSnaps.length / snapsPerPage) ? 'not-allowed' : 'pointer'
                        }}
                        disabled={currentPage === Math.ceil(allSnaps.length / snapsPerPage)}
                    >
                        <FontAwesomeIcon icon={faChevronRight} size="lg" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-4 mb-10">
                    {Array.from({ length: Math.ceil(allSnaps.length / snapsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 hover:scale-110
                            ${currentPage === index + 1 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
                            style={{
                                boxShadow: currentPage === index + 1 ? `0 0 15px ${colors.highlight}` : 'none'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UploadForm onImageUpload={handleImageUpload} />
            </Modal>

            {/* Footer */}
            <footer className="py-10 text-center" style={{ backgroundColor: colors.accent }}>
                <p className="text-gray-300">
                    &copy; {new Date().getFullYear()} Snap Gallery. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default Gallery;