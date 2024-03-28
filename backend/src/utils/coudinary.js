import { v2 as cloudinary } from "cloudinary";
import { deleteFile } from "./multer.js";

const cloudinaryFileUpload = async (url) => {
  try {
    cloudinary.config({
      cloud_name: process.env.COUDINARY_API_NAME,
      api_key: process.env.COUDINARY_API_KEY,
      api_secret: process.env.COUDINARY_API_SECURITY,
      secure: true,
    });

    const result = await cloudinary.uploader.upload(url, {
      resource_type: "auto",
    });
    console.log("result", result);
    // delete the file after successful upload
    await deleteFile(url);
    return result?.url;
  } catch (error) {
    // delete the file if failed to upload
    await deleteFile(url);
    console.error("Error uploading file:", error.message);
  }
};

export default cloudinaryFileUpload;
