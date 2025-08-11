const express = require("express");

const router = express.Router();

const { addSubject, getSubject, deleteSubject, } = require("../../controllers/schooladmin/subjectController");

const authenticateJWT = require("../../middleware/authMiddleware");




router.post("/subject", authenticateJWT, addSubject);
router.get("/subjects", authenticateJWT, getSubject);
router.delete("/subject/:id", authenticateJWT, deleteSubject);

module.exports = router;