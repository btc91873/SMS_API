const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  // console.log(token)

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified)
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateJWT;



