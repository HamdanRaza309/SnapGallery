import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="relative bg-white rounded-lg shadow-2xl p-8 w-11/12 max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-transform transform hover:scale-125"
                >
                    <FaTimes size={24} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
