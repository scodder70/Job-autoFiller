import express, { Router } from "express";
import multer from "multer";
import path from "path";
// Get __dirname equivalent in ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, "resume" + Date.now() + ".pdf");
    },
  }),
}).single("user_file");
export default upload;
