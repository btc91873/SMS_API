const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handleAddSchool } = require("../../controllers/addSchools/schools");

// ⬇️ Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ⬇️ API Route
router.post("/add", upload.single("schoolLogo"), handleAddSchool);

// ✅ Export the router
module.exports = router;
