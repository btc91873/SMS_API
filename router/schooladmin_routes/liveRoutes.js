const express = require("express");
const router = express.Router();
const { getLiveClasses } = require("../../controllers/schooladmin/liveDash.js");
const authenticateJWT = require("../../middleware/authMiddleware.js");

router.get("/live-classes", authenticateJWT, getLiveClasses);


module.exports = router;
