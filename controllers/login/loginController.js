require("dotenv").config();
const jwt = require("jsonwebtoken");

const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleLogin(req, res) {
  const { username, password, usertype } = req.body;
  console.log(username, password, usertype);
  await poolConnect;
  var result;
  if (usertype == "Schooladmin") {
    result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query(`select AdminEmail,AdminPassword from dbo.Schools where AdminEmail=@username and AdminPassword = @password
      `);
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
      console.log("Login successful for teacher");
    } else {
      console.log("Invalid teacher credentials");
    }
  }

  if (result.recordset.length == 0) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  } else {
    const user = result.recordset[0];
    const accessToken = jwt.sign(
      { name: user.UserName, usertype: user.UserType },
      process.env.JWT_SECRET
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "None", // or "None" for cross-origin with secure: true
      secure: false, // make this true only if you're using HTTPS
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "user logedIn",
      username: user.name,
    });
  }
}

module.exports = { handleLogin };
