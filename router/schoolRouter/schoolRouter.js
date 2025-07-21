const express = require("express");
const router = express.Router();
const { handleAddSchool } = require("../../controllers/addSchools/schools");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ FIXED path: go two levels up to reach /uploads
const uploadsPath = path.join(__dirname, "../../uploads");

// ✅ Ensure the uploads folder exists
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("schoolLogo"), handleAddSchool);

module.exports = router;
