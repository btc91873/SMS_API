require("dotenv").config();
const jwt = require("jsonwebtoken");
const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleLogin(req, res) {
  const { username, password, usertype } = req.body;

  await poolConnect;

  try {
    let result;
    let schoolId;

    // Schooladmin login
    if (usertype === "Schooladmin") {
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password).query(`
          SELECT SchoolId, AdminEmail AS UserName, 'Schooladmin' AS UserType
          FROM dbo.Schools
          WHERE AdminEmail = @username AND AdminPassword = @password
        `);
    }

    // Superadmin login
    else if (usertype === "superadmin") {
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password)
        .input("usertype", sql.NVarChar, usertype).query(`
          SELECT UserName, UserType 
          FROM dbo.AuthTable
          WHERE UserName = @username AND Password = @password AND UserType = @usertype
        `);
    }

    // Teacher login
    else if (usertype === "teacher") {
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password).query(`
          SELECT email AS UserName, 'teacher' AS UserType
          FROM dbo.teacherList  
          WHERE email = @username AND password = @password
        `);
    }

    // Invalid user type
    else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid usertype" });
    }

    // No matching user
    if (!result || !result.recordset || result.recordset.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    schoolId = user.SchoolId || null;

    // Check school subscription expiry
    if (schoolId) {
      const schoolResult = await pool
        .request()
        .input("schoolId", sql.Int, schoolId).query(`
          SELECT endDate FROM dbo.Schools WHERE SchoolId = @schoolId
        `);

      if (
        schoolResult.recordset.length === 0 ||
        new Date() > new Date(schoolResult.recordset[0].endDate)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "School subscription has expired. Please contact administrator.",
        });
      }
    }

    // Prepare JWT payload
    const tokenPayload = {
      name: user.UserName,
      usertype: user.UserType,
    };
    if (usertype === "Schooladmin" && user.SchoolId) {
      tokenPayload.schoolId = user.SchoolId;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Generate token
    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    // Set cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // Set to true in production with HTTPS
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: "User logged in",
      username: user.UserName,
      usertype: user.UserType,
      Id: schoolId,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Logout controller
function handleLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
}

module.exports = { handleLogin, handleLogout };
