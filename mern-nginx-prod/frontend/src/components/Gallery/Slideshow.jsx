// import React, { useState, useEffect } from 'react';

// const Slideshow = ({ images, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
//       <img src={images[currentIndex].url} alt={images[currentIndex].title} className="max-w-full max-h-screen" />
//       <button className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1" onClick={onClose}>Close</button>
//     </div>
//   );
// };

// export default Slideshow;


import React, { useState, useEffect } from 'react';

const Slideshow = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative max-w-4xl">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="w-full h-auto max-h-screen rounded-lg"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded">
          <h3 className="text-lg font-bold">{images[currentIndex].title}</h3>
          <p>{images[currentIndex].description}</p>
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

export default Slideshow;