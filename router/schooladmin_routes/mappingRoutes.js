const express = require("express");

const router = express.Router();

const { getAllClassMapping, addClassMapping, updateClassMapping, deleteClassMapping } = require("../../controllers/schooladmin/mappingController");
//const verifyRoute = require("../../middleware/verifyRoute");
const authenticateJWT = require("../../middleware/authMiddleware");


router.put("/class-mappings/:id", authenticateJWT, updateClassMapping);
router.get("/class-mapping", authenticateJWT, getAllClassMapping);
router.post("/class-mappings", addClassMapping);
router.delete("/class-mappings/:id", authenticateJWT, deleteClassMapping);

// router.put("/class-mappings/:id", updateClassMapping);


module.exports = router;
