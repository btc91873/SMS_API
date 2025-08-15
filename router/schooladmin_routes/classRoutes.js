const express = require("express");
const router = express.Router();

const {
  addClass,
  getClass,
  getPeriods,
  getSubjects,
} = require("../../controllers/schooladmin/classController");

router.post("/class", addClass);
router.get("/getClass", getClass);
router.get("/getPeriods", getPeriods);
router.get("/getSubjects", getSubjects);

module.exports = router;
