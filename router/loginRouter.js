const express = require("express");
const loginRouter = express.Router();
const { handleLogin } = require("../controllers/login/loginController");
// const { verify } = require("jsonwebtoken");
const verifyRoute = require("../middleware/verifyRoute");

loginRouter.post("/login", handleLogin);

loginRouter.post("/verify", verifyRoute, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

module.exports = loginRouter;
