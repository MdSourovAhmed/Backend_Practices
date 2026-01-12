import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ImageCard from "../Gallery/ImageCard";
import ImageModal from "../Gallery/ImageModal";
import Slideshow from "../Gallery/Slideshow";
import Tabs from "../Tabs";

const ImgGallery = () => {
  const [selectedImage, setSelectedImage] = useState(true);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await api.get('/images');
        // console.log(data);
        setImages(data);
      } catch (error) {
        // console.log(error);
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [setImages]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} onClick={() => setSelectedImage(image)} />
        ))}
        {/* <Tabs
          setImages={setImages}
          setIsSlideshow={setIsSlideshow}
          setSelectedImage={setSelectedImage}
        />
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
        {isSlideshow && (
          <Slideshow images={images} onClose={() => setIsSlideshow(false)} />
        )} */}
      </div>
    </>
  );
};

export default ImgGallery;
