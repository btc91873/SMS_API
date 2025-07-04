const jwt = require("jsonwebtoken");

async function verifyRoute(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ status: 404, message: "not token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      next();
    }
  } catch (error) {
    res.json({ message: "error" });
  }
}

module.exports = verifyRoute;
