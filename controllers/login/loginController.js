require("dotenv").config();
const jwt = require("jsonwebtoken");

const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleLogin(req, res) {
  const { username, password, usertype } = req.body;
  await poolConnect;
  var result;
  if (usertype == "Schooladmin") {
    result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query(`SELECT SchoolId, AdminEmail, AdminPassword FROM dbo.Schools WHERE AdminEmail = @username AND AdminPassword = @password`);

  } else if (usertype == "superadmin") {
    result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .input("usertype", sql.NVarChar, usertype)
      .query(`SELECT * FROM dbo.AuthTable
           WHERE UserName  = @username
          AND Password = @password
          AND UserType  = @usertype
      `);
  } else if (usertype == "teacher") {

    if (username === "teacher" && password === "teacher") {
      result = {
        recordset: [
          {
            UserName: "teacher",
            UserType: "teacheradmin",
          },
        ],
      };

    } else {
    }

  }

  if (result.recordset.length == 0) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } else {
    const user = result.recordset[0];

    // Add schoolId to token payload for school admins
    let tokenPayload = {
      name: user.UserName || user.AdminEmail,
      usertype: usertype
    };

    if (usertype === "Schooladmin" && user.SchoolId) {
      tokenPayload.schoolId = user.SchoolId; // ✅ only attach if exists
    }


    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "Lax", // ✅ Fix for localhost without HTTPS
      secure: false,   // ✅ for development (must be true in prod HTTPS)
      maxAge: 3600000,
    });


    res.status(200).json({
      message: "User logged in",
      username: tokenPayload.name,
    });
  }

}
// In your auth controller
function handleLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
}

module.exports = { handleLogin, handleLogout };


// module.exports = { handleLogin };
