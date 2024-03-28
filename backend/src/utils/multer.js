import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadStorage = multer({ storage: storage });

// delete the file after upload is complete or an error is thrown
export const deleteFile = (url)=>{
  fs.unlink(url, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}
