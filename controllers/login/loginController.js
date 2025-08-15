// // require("dotenv").config();
// // const jwt = require("jsonwebtoken");

// // const { sql, pool, poolConnect } = require("../../connection/connection");

// // async function handleLogin(req, res) {
// //   const { username, password, usertype } = req.body;
// //   await poolConnect;
// //   var result;
// //   if (usertype == "Schooladmin") {
// //     result = await pool
// //       .request()
// //       .input("username", sql.NVarChar, username)
// //       .input("password", sql.NVarChar, password)
// //       .query(`select AdminEmail,AdminPassword from dbo.Schools where AdminEmail=@username and AdminPassword = @password
// //       `);
// //   } else if (usertype == "superadmin") {
// //     result = await pool
// //       .request()
// //       .input("username", sql.NVarChar, username)
// //       .input("password", sql.NVarChar, password)
// //       .input("usertype", sql.NVarChar, usertype)
// //       .query(`SELECT * FROM dbo.AuthTable
// //            WHERE UserName  = @username
// //           AND Password = @password
// //           AND UserType  = @usertype
// //       `);
// //   } else if (usertype == "teacher") {
// //     // if (username === "teacher" && password === "teacher") {
// //     // result = {
// //     //   recordset: [
// //     //     {
// //     //       UserName: "teacher",
// //     //       UserType: "teacheradmin",
// //     //     },
// //     //   ],

// //     result = await // .input("usertype",sql.NVarChar,usertype)
// //     pool
// //       .request()
// //       .input("username", sql.NVarChar, username)
// //       .input("password", sql.NVarChar, password)
// //       .query(` SELECT email AS UserName, 'teacher' AS UserType
// //       FROM dbo.teacherList
// //       WHERE email = @username AND password = @password`);

// //     console.log("Login successful for teacher");
// //   } else {
// //     console.log("Invalid teacher credentials");
// //   }
// // }

// // if (result.recordset.length == 0) {
// //   return res
// //     .status(401)
// //     .json({ success: false, message: "Invalid credentials" });
// // } else {
// //   const user = result.recordset[0];
// //   const accessToken = jwt.sign(
// //     { name: user.UserName, usertype: user.UserType },
// //     process.env.JWT_SECRET
// //   );

// //   res.cookie("token", accessToken, {
// //     httpOnly: true,
// //     sameSite: "None", // or "None" for cross-origin with secure: true
// //     secure: false, // make this true only if you're using HTTPS
// //     maxAge: 3600000, // 1 hour
// //   });

// //   res.status(200).json({
// //     message: "user logedIn",
// //     username: user.name,
// //   });
// // }

// // module.exports = { handleLogin };

// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const { sql, pool, poolConnect } = require("../../connection/connection");

// async function handleLogin(req, res) {
//   const { username, password, usertype } = req.body;
//   await poolConnect;
//   var result;
//   if (usertype == "Schooladmin") {
//     result = await pool
//       .request()
//       .input("username", sql.NVarChar, username)
//       .input("password", sql.NVarChar, password)
//       .query(`SELECT SchoolId, AdminEmail, AdminPassword FROM dbo.Schools WHERE AdminEmail = @username AND AdminPassword = @password`);

//   } else if (usertype == "superadmin") {
//     result = await pool
//       .request()
//       .input("username", sql.NVarChar, username)
//       .input("password", sql.NVarChar, password)
//       .input("usertype", sql.NVarChar, usertype)
//       .query(`SELECT * FROM dbo.AuthTable
//            WHERE UserName  = @username
//           AND Password = @password
//           AND UserType  = @usertype
//       `);
//   } else if (usertype == "teacher") {

//     if (username === "teacher" && password === "teacher") {
//       result = {
//         recordset: [
//           {
//             UserName: "teacher",
//             UserType: "teacheradmin",
//           },
//         ],
//       };

//     } else {
//     }

//   let result;

//   try {
//     if (usertype === "Schooladmin") {
//       result = await pool
//         .request()
//         .input("username", sql.NVarChar, username)
//         .input("password", sql.NVarChar, password).query(`
//           SELECT AdminEmail AS UserName, 'Schooladmin' AS UserType
//           FROM dbo.Schools
//           WHERE AdminEmail = @username AND AdminPassword = @password
//         `);
//     } else if (usertype === "superadmin") {
//       result = await pool
//         .request()
//         .input("username", sql.NVarChar, username)
//         .input("password", sql.NVarChar, password)
//         .input("usertype", sql.NVarChar, usertype).query(`
//           SELECT UserName, UserType
//           FROM dbo.AuthTable
//           WHERE UserName = @username AND Password = @password AND UserType = @usertype
//         `);
//     } else if (usertype === "teacher") {
//       result = await pool
//         .request()
//         .input("username", sql.NVarChar, username)
//         .input("password", sql.NVarChar, password).query(`
//           SELECT email AS UserName, 'teacher' AS UserType
//           FROM dbo.teacherList
//           WHERE email = @username AND password = @password
//         `);
//       console.log("Login successful for teacher");
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid usertype" });
//     }
//       console.log("Invalid teacher credentials");
//     }

//   }

//     if (result.recordset.length === 0) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//   if (result.recordset.length == 0) {
//     return res.status(401).json({ success: false, message: "Invalid credentials" });
//   } else {
//     const user = result.recordset[0];

//     // Add schoolId to token payload for school admins
//     let tokenPayload = {
//       name: user.UserName || user.AdminEmail,
//       usertype: usertype
//     };

//     if (usertype === "Schooladmin" && user.SchoolId) {
//       tokenPayload.schoolId = user.SchoolId; // ✅ only attach if exists
//     }

//     const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

//     res.cookie("token", accessToken, {
//       httpOnly: true,
//       sameSite: "None", // Use "Lax" or "Strict" for same-origin apps
//       secure: false, // true only if using HTTPS
//       maxAge: 3600000, // 1 hour
//       sameSite: "Lax", // ✅ Fix for localhost without HTTPS
//       secure: false,   // ✅ for development (must be true in prod HTTPS)
//       maxAge: 3600000,
//     });

//     return res.status(200).json({
//       message: "User logged in",
//       username: user.UserName,
//       usertype: user.UserType,
//     });
//   } catch (err) {
//     console.error("Login error:", err);

//     return res

//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//     res.status(200).json({
//       message: "User logged in",
//       username: tokenPayload.name,
//     });
//   }

// }
// // In your auth controller
// function handleLogout(req, res) {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Logged out" });
// }

// module.exports = { handleLogin, handleLogout };

// module.exports = { handleLogin };

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleLogin(req, res) {
  const { username, password, usertype } = req.body;

  await poolConnect;
  let result;

  try {
    if (usertype === "Schooladmin") {
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password)
        .input("usertype", usertype).query(`
          SELECT SchoolId, AdminEmail AS UserName, 'Schooladmin' AS UserType
          FROM dbo.Schools
          WHERE AdminEmail = @username AND AdminPassword = @password
        `);
    } else if (usertype === "superadmin") {
      console.log(username, password, usertype);
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password)
        .input("usertype", sql.NVarChar, usertype).query(` 
          SELECT * 
          FROM dbo.AuthTable
          WHERE UserName = @username AND Password = @password AND UserType = @usertype  
        `);
      console.log(result.recordset);
    } else if (usertype === "teacher") {
      result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password).query(`
          SELECT email AS UserName, 'teacher' AS UserType
          FROM dbo.teacherList
          WHERE email = @username AND password = @password
        `);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid usertype" });
    }

    if (result.recordset.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = result.recordset[0];

    // Prepare token payload
    const tokenPayload = {
      name: user.UserName,
      usertype: user.UserType,
    };

    if (usertype === "Schooladmin" && user.SchoolId) {
      tokenPayload.schoolId = user.SchoolId;
    }

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "User logged in",
      username: user.UserName,
      usertype: user.UserType,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

function handleLogout(req, res) {
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out" });
}

module.exports = { handleLogin, handleLogout };
