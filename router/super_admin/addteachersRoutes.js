const express = require("express");
const router = express.Router();
const addTeacher = require("../../controllers/schooladmin/addnewteacher");

router.post("/add", addTeacher);

module.exports = router;
