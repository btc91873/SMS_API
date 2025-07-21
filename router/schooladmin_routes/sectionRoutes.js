const express = require("express");

const router = express.Router();

const {
  addSection,
  getSection,
} = require("../../controllers/schooladmin/sectionController");

router.post("/section", addSection);
router.get("/getSections", getSection);

module.exports = router;
