const express = require("express");
const { getAllTeachers, addTeacher, updateTeacher, getTeacherById, getTeacherCounts } = require("../controllers/teacherform");

const authenticateJWT = require("../middleware/authMiddleware");
const teacherRouter = express.Router();

teacherRouter.get("/getTeachers", authenticateJWT, getAllTeachers);
teacherRouter.get("/getTeachersCount", authenticateJWT, getTeacherCounts);
teacherRouter.post("/addTeacher", authenticateJWT, addTeacher);
teacherRouter.put("/update/:id", authenticateJWT, updateTeacher);
teacherRouter.get("/:id", authenticateJWT, getTeacherById);

module.exports = teacherRouter;