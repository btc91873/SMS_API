// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");

// function authenticateJWT(req, res, next) {
//   const token = req.cookies.token; // token stored in cookie

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET); // verify token
//     req.user = verified; // add token data to request
//     next(); // go to next middleware/route
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

// module.exports = authenticateJWT;


const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.cookies.token;

  console.log("🔐 [authMiddleware] Token received:", token); // <== Add this

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ [authMiddleware] Decoded token:", verified); // <== Add this

    req.user = verified;
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateJWT;

