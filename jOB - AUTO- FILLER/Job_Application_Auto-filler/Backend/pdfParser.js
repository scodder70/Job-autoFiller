import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";

const router = express.Router();

// More robust file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), "uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

router.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    // Comprehensive logging
    console.log("Uploaded File Details:", {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      fullPath: path.resolve(req.file.path),
    });

    // Validate file existence with absolute path
    const absoluteFilePath = path.resolve(req.file.path);

    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(404).json({
        error: "File not found",
        path: absoluteFilePath,
      });
    }

    // Read file with absolute path
    const fileBuffer = fs.readFileSync(absoluteFilePath);

    // Parse PDF
    const pdfData = await pdfParse(fileBuffer);

    // Extract data
    const extractedData = {
      fileName: req.file.originalname,
      rawText: pdfData.text,
      parsedDetails: extractDetails(pdfData.text),
    };

    // Delete temporary file
    fs.unlinkSync(absoluteFilePath);

    res.status(200).json(extractedData);
  } catch (err) {
    console.error("Parsing Error:", err);
    res.status(500).json({
      error: "Resume parsing failed",
      message: err.message,
    });
  }
});

function extractDetails(text) {
  return {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
  };
}

function extractName(text) {
  const namePatterns = [/^[A-Z][a-z]+ [A-Z][a-z]+/, /Name:\s*(.+)/i];

  for (let pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) return match[1] || match[0];
  }
  return "Name Not Found";
}

function extractEmail(text) {
  const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : "Email Not Found";
}

function extractPhone(text) {
  const phonePatterns = [/\+?91?\s?\d{10}/, /\d{3}[-.]?\d{3}[-.]?\d{4}/];

  for (let pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return "Phone Not Found";
}

function extractSkills(text) {
  const skillsPattern = /skills?[:]\s*(.+)/i;
  const match = text.match(skillsPattern);
  return match ? match[1].split(/[,\n]/).map((s) => s.trim()) : [];
}

export default router;
