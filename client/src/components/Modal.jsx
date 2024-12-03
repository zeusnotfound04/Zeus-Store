import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 ease-in-out">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 font-semibold text-lg hover:text-gray-800 focus:outline-none transition-colors duration-200"
          >
            &times;
          </button>

          {/* Modal content hai yeh */}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
