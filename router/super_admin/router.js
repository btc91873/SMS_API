const express = require("express");
const getSchools = require("../../controllers/super_admin/schools");
const super_adminRouter = express.Router();

super_adminRouter.get("/getSchool", getSchools);
module.exports = super_adminRouter;
