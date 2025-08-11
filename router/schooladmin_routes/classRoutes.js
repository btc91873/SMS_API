const express = require("express");
const router = express.Router();

const {
  addClass,
  getClass,
  updateClass,
  deleteClass,
} = require("../../controllers/schooladmin/classController");

router.post("/class", addClass);
router.get("/getClass", getClass);
router.put("/class/:id", updateClass);
router.delete("/class/:id", deleteClass);
module.exports = router;
