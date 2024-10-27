import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Set up storage with multer
const storage = multer.memoryStorage(); // Store files in memory temporarily

// Define the file filter with types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true); // Accept file
  } else {
    callback(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
  }
};

// Configure the multer upload with types
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

export default upload;
