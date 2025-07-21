const express = require("express");

const router = express.Router();

const {
  mapClassSection,
} = require("../../controllers/schooladmin/mappingController");

router.post("/map-class-section", mapClassSection);

module.exports = router;
