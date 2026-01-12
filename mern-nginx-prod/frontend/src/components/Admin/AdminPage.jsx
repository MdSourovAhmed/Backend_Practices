import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import UploadForm from "./UploadForm";
import ImageGallery from "./ImgGallery";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="container mx-auro h-screen">
      <div className="mb-6">
        <h1 className="text-lg my-4 text-gray-600">Manage Upload Images</h1>
        <button className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
        onClick={()=>{navigate("/admin/upload")}}
        >
          Admin Upload
        </button>
      </div>

      <div className="pb-6">
        <h1>Admin Gallery</h1>
        <ImageGallery/>
      </div>
    </div>
  );
};

export default AdminPage;
