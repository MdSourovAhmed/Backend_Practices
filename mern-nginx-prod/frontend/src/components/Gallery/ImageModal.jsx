import React from 'react';

const ImageModal = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div className="relative max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-auto max-h-screen rounded-lg"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded">
          <h3 className="text-lg font-bold">{image.title}</h3>
          <p>{image.description}</p>
        </div>
        <button
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;