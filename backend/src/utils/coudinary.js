import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.COUDINARY_API_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECURITY,
  secure: true,
});

const cloudinaryFileUpload = async (url) => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      resource_type: "auto",
    });
    // delete the file after successful upload
     fs.unlink(url, (err) => {
       if (err) {
         console.error("Error deleting file:", err);
       } else {
         console.log("File deleted successfully");
       }
     });
    return result?.url;
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
};

export default cloudinaryFileUpload;
