import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ImageCard from './Gallery/ImageCard';

const Tabs = ({ setImages, setIsSlideshow, setSelectedImage }) => {
  const [activeTab, setActiveTab] = useState('People');
  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await api.get(`/images?tag=${activeTab}`);
        setLocalImages(data);
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [activeTab, setImages]);

  return (
    <section className="mb-12">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('People')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === 'People' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          People
        </button>
        <button
          onClick={() => setActiveTab('Nature')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === 'Nature' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Nature
        </button>
        <button
          onClick={() => setIsSlideshow(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold transition-colors duration-300"
        >
          Start Slideshow
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {localImages.map((image) => (
          <ImageCard key={image._id} image={image} onClick={() => setSelectedImage(image)} />
        ))}
      </div>
    </section>
  );
};

export default Tabs;