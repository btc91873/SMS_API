const express = require("express");

const router = express.Router();

const {
  addSection,
  getSection,
  deleteSection,
} = require("../../controllers/schooladmin/sectionController");

router.post("/section", addSection);
router.get("/getsections", getSection);
router.delete("/Section/:id", deleteSection)
module.exports = router;
