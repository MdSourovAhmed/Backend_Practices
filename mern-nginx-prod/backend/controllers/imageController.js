// // const Image = require('../models/Image');
// // const cloudinary = require('../config/cloudinary');
// // const multer = require('multer');
// // const upload = multer({ storage: multer.memoryStorage() });

// // const getImages = async (req, res) => {
// //   const { tag } = req.query;
// //   try {
// //     const images = await Image.find(tag ? { tag } : {});
// //     res.json(images);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to fetch images' });
// //   }
// // };

// // const uploadImage = (req, res) => {
// //   upload.single('file')(req, res, async (err) => {
// //     if (err) return res.status(500).json({ message: 'Upload error' });
// //     try {
// //       const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.file.buffer.toString('base64')}`);
// //       const image = new Image({
// //         title: req.body.title,
// //         description: req.body.description,
// //         url: result.secure_url,
// //         tag: req.body.tag,
// //       });
// //       console.log(image);
// //       await image.save();
// //       res.status(201).json({ message: 'Image uploaded' });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Upload failed' });
// //     }
// //   });
// // };

// // const deleteImage = async (req, res) => {
// //   try {
// //     await Image.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Image deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Delete failed' });
// //   }
// // };

// // module.exports = { getImages, uploadImage, deleteImage };

// const Image = require("../models/Image");
// // const cloudinary = require("../config/cloudinary");
// // // const multer = require("multer");
// // const dotenv = require("dotenv");
// // dotenv.config();

// // // Configure Multer with file type validation
// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   fileFilter: (req, file, cb) => {
// //     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
// //     if (!allowedTypes.includes(file.mimetype)) {
// //       return cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
// //     }
// //     cb(null, true);
// //   },
// // });

// var cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// dotenv.config();
// const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
// const api_key = process.env.CLOUDINARY_API_KEY;
// const api_secret = process.env.CLOUDINARY_API_SECRET;

// cloudinary.config({
//   cloud_name: cloud_name,
//   api_key: api_key,
//   api_secret: api_secret,
// });

// console.log(cloud_name);

// const getImages = async (req, res) => {
//   const { tag } = req.query;
//   try {
//     const images = await Image.find(tag ? { tag } : {});
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch images" });
//   }
// };

// // const uploadImage = async (req, res) => {

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };
// const uploadImage = (file, req, res) => {
//   //imgage = > base64
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(file, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
//   // };

//   console.log(result.secure_url);

//   // upload.single("file")(req, res, async (err) => {
//   //   if (err) return res.status(500).json({ message: "Upload error" });
//   //   try {
//   //     const mimeType = req.file.mimetype;
//   //     if (!["image/jpeg", "image/jpg", "image/png"].includes(mimeType)) {
//   //       return res
//   //         .status(400)
//   //         .json({ message: "Only JPG, JPEG, and PNG files are allowed" });
//   //     }
//   //     console.log(req.body.title);
//   //     // console.log(description);
//   //     // console.log(tag);
//   //     const base64Image = `data:${mimeType};base64,${req.file.buffer.toString(
//   //       "base64"
//   //     )}`;
//   //     const result = await cloudinary.uploader.upload(base64Image);

//   const image = new Image({
//     title: req.body.title,
//     description: req.body.description,
//     url: result.secure_url,
//     tag: req.body.tag,
//   });

//   console.log(image);

//   // await image.save();
//   //     res.status(201).json({ message: "Image uploaded" });
//   //   } catch (error) {
//   //     res.status(500).json({ message: "Upload failed" });
//   //   }
//   // });
// };

// const deleteImage = async (req, res) => {
//   try {
//     const image = await Image.findByIdAndDelete(req.params.id);
//     if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//     }
//     res.json({ message: "Image deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// };

// module.exports = { getImages, uploadImage, deleteImage };











const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// Get images (with optional tag filter)
const getImages = async (req, res) => {
  const { tag } = req.query;
  try {
    const images = await Image.find(tag ? { tag } : {});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
    console.log(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

// Upload image to Cloudinary and save in DB
const uploadImage = async (req, res) => {
  try {
    const file = req.body.file; // Expecting base64 or file path
    const opts = {
      overwrite: true,
      invalidate: true,
      resource_type: "auto",
    };

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, opts);

    if (!result.secure_url) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // Save image metadata to MongoDB
    const image = new Image({
      title: req.body.title,
      description: req.body.description,
      url: result.secure_url,
      tag: req.body.tag,
    });

    await image.save();

    res.status(201).json(image);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

// Delete image by ID
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {getAllImages, getImages, uploadImage, deleteImage };
