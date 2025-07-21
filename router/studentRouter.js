const express = require("express");
const studentRouter = express.Router();
const {getAllstudents,getStudentById,addStudent,updateStudent} = require("../controllers/studentform");
const authenticateJWT = require("../middleware/authMiddleware");

studentRouter.get("/getStudents", authenticateJWT, getAllstudents);
studentRouter.put("/updatestudent/:id", authenticateJWT,updateStudent)
studentRouter.get("/student/:id", authenticateJWT,getStudentById);
studentRouter.post("/addStudent", authenticateJWT, addStudent);

module.exports = studentRouter;
