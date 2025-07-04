const express = require("express");
const verifyRoute = require("../middleware/verifyRoute");
const {
  getAllAttendance,
} = require("../controllers/teacher/getAttendenceData");
const teacherRouter = express.Router();

teacherRouter.get("/getAttendence", verifyRoute, getAllAttendance);

module.exports = teacherRouter;
