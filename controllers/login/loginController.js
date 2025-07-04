require("dotenv").config();
const jwt = require("jsonwebtoken");

const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleLogin(req, res) {
  const { username, password, usertype } = req.body;
  await poolConnect;

  const result = await pool
    .request()
    .input("username", sql.NVarChar, username)
    .input("password", sql.NVarChar, password)
    .input("usertype", sql.NVarChar, usertype).query(`SELECT * FROM AuthTable
           WHERE UserName COLLATE SQL_Latin1_General_CP1_CI_AS = @username
          AND Password = @password
          AND UserType COLLATE SQL_Latin1_General_CP1_CI_AS = @usertype
      `);

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
