import { v2 as cloudinary } from "cloudinary";
import { deleteFile } from "./multer.js";

cloudinary.config({
  cloud_name: "dcbiecgcl",
  api_key: "344462162348942",
  api_secret: "KCvZ8dDv3QT5zb5GH64QmjqPKLA",
  secure: true,
});

const cloudinaryFileUpload = async (url) => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      resource_type: "auto",
    });
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
