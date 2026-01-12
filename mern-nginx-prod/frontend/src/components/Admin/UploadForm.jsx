// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import ImagGallery from "./ImgGallery";

// const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => resolve(fileReader.result);
//     fileReader.onerror = (error) => reject(error);
//   });
// };

// const UploadForm = () => {
//   const [UploadedImg,setUploadedImg]=useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/admin/login");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const file = e.target.file?.files[0];

//     // Client-side file type validation
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }
//     if (!allowedTypes.includes(file.type)) {
//       alert("Only JPEG, JPG, and PNG files are allowed");
//       return;
//     }

//     try {
//       const base64 = await convertBase64(file);
//       const payload = {
//         title: e.target.title.value,
//         description: e.target.description.value,
//         tag: e.target.tag.value,
//         file: base64,
//       };
//       console.log(payload);

//       const {Ing}= await api.post("/images", payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Image uploaded successfully");
//       console.log(Img);
//       // setUploadedImg(response.data[3]);
//       e.target.reset();
//     } catch (error) {
//       alert(error.response?.data?.message || "Upload failed");
//     }
//   };

//   return (
//     <>
//       <div className="max-w-md mx-auto mt-12">
//         <h2 className="text-2xl font-bold mb-4">Admin Upload</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Image Title"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Image Description"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <select name="tag" className="w-full p-2 border rounded" required>
//             <option value="People">People</option>
//             <option value="Nature">Nature</option>
//             <option value="Nature">Sports</option>
//           </select>
//           <div className="border  border-gray-800 rounded">
//             <input
//               type="file"
//               name="file"
//               accept="image/jpeg,image/jpg,image/png"
//               className="w-full p-2"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             Upload Image
//           </button>
//         </form>
//       </div>
//       <div className="mx-auto mt-10">{/* <ImagGallery/> */UploadedImg}</div>
//     </>
//   );
// };

// export default UploadForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminPage from "./AdminPage";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

const UploadForm = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG, JPG, and PNG files are allowed");
        setPreviewImage(null);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.file.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const base64 = await convertBase64(file);
      const payload = {
        title: e.target.title.value,
        description: e.target.description.value,
        tag: e.target.tag.value,
        file: base64,
      };
      const response = await api.post("/images", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Assuming backend returns the saved image object
      const newImage = {
        url: response.data.url, // Adjust based on backend response
        title: formData.get("title"),
        description: formData.get("description"),
        tag: formData.get("tag"),
      };
      setUploadedImage(newImage);
      alert("Image uploaded successfully");
      e.target.reset();
      setPreviewImage(null);
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="mb-4"
      onClick={()=>{navigate('/admin')}}
      >
        <button className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer">Back to Admin Page</button>
      </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-600">Admin Upload</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <input
              type="text"
              name="title"
              placeholder="Image Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Image Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div>
            <select
              name="tag"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="People">People</option>
              <option value="Nature">Nature</option>
              <option value="Nature">Sports</option>
            </select>
          </div>
          <div>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Upload Image
          </button>
        </form>

        {/* Preview Image (Before Upload) */}
        {previewImage && (
          <div className="mt-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Preview
            </h3>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Uploaded Image (After Upload) */}
        {uploadedImage && (
          <div className="mt-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Uploaded Image
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={uploadedImage.url}
                alt={uploadedImage.title}
                className="w-full h-auto rounded-md mb-4"
              />
              <h4 className="text-md font-semibold text-gray-800">
                {uploadedImage.title}
              </h4>
              <p className="text-sm text-gray-600">
                {uploadedImage.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tag: {uploadedImage.tag}
              </p>
            </div>
          </div>
        )}
      </div>
  );
};

export default UploadForm;
