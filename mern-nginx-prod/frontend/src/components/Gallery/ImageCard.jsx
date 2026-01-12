import React from 'react';

const ImageCard = ({ image, onClick }) => {
  return (
    <div
      className="image-card bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold text-gray-800">{image.title}</h3>
      <p className="text-sm text-gray-600">{image.description}</p>
    </div>
  );
};

export default ImageCard;