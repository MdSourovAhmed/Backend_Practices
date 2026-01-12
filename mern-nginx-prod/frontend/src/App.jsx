import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Tabs from "./components/Tabs";
import Navbar from "./components/Navbar";
import Login from "./components/Admin/Login";
import Register from "./components/Admin/Register";
import AdminPage from "./components/Admin/AdminPage";
import ImageModal from "./components/Gallery/ImageModal";
import Slideshow from "./components/Gallery/Slideshow";
import UploadForm from "./components/Admin/UploadForm";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <Router>
      <div className="scroll-smooth mx-auto min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <About />
                  <Tabs
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
                    <Slideshow
                      images={images}
                      onClose={() => setIsSlideshow(false)}
                    />
                  )}
                </>
              }
            />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/upload" element={<UploadForm />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
