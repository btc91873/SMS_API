const express = require("express");
const router = express.Router();

const {
  addClass,
  getClass,
  getPeriods,
  getSubjects,
  updateClass,
  deleteClass,
} = require("../../controllers/schooladmin/classController");

router.post("/class", addClass);
router.get("/getClass", getClass);
router.get("/getPeriods", getPeriods);
router.get("/getSubjects", getSubjects);

router.put("/class/:id", updateClass);
router.delete("/class/:id", deleteClass);
// >>>>>>> 00500a6a500a37832471c762414c2403896ed2b4
module.exports = router;
