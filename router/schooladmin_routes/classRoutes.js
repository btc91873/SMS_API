const express = require("express");
const router = express.Router();

const {
  addClass,
  getClass,
} = require("../../controllers/schooladmin/classController");

router.post("/class", addClass);
router.get("/getClass", getClass);

module.exports = router;
