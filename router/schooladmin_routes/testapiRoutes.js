const express = require("express");

const testapiRoutes = express.Router();
const { testapi } = require("../../controllers/schooladmin/testapi");
testapiRoutes.post("/addsections", testapi);
module.exports = testapiRoutes;
