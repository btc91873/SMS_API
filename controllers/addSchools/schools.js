// const { sql, pool, poolConnect } = require("../../connection/connection");

// async function handleAddSchool(req, res) {
//   try {
//     const { schoolName, startDate, endDate, adminEmail, adminPassword } =
//       req.body;

//     const schoolLogo = "vendor"; // file name from multer

//     console.log(" Received data: ", {
//       schoolName,
//       schoolLogo,
//       startDate,
//       endDate,
//       adminEmail,
//       adminPassword,
//     });

//     await poolConnect;

//     await pool
//       .request()
//       .input("SchoolName", sql.NVarChar, schoolName)
//       .input("LogoURL", sql.NVarChar, schoolLogo)
//       .input("StartDate", sql.Date, startDate)
//       .input("EndDate", sql.Date, endDate)
//       .input("Status", sql.NVarChar, "Active")
//       .input("AdminEmail", sql.NVarChar, adminEmail)
//       .input("AdminPassword", sql.NVarChar, adminPassword).query(`
//         INSERT INTO dbo.Schools
//         (SchoolName, LogoURL, StartDate, EndDate, Status, AdminEmail, AdminPassword, CreatedAt)
//         VALUES (@SchoolName, @LogoURL, @StartDate, @EndDate, @Status, @AdminEmail, @AdminPassword, GETDATE())
//       `);

//     res.status(201).json({ message: "School added successfully!" });
//   } catch (err) {
//     console.error("SQL Error:", err);
//     res
//       .status(500)
//       .json({ error: "Failed to add school.", details: err.message });
//   }
// }

// module.exports = { handleAddSchool };

const { sql, pool, poolConnect } = require("../../connection/connection");

async function handleAddSchool(req, res) {
  try {
    const { schoolName, startDate, endDate, adminEmail, adminPassword } =
      req.body;

    const schoolLogo = req.file?.filename || null; // ✅ use uploaded file

    await poolConnect;

    await pool
      .request()
      .input("SchoolName", sql.NVarChar, schoolName)
      .input("LogoURL", sql.NVarChar, schoolLogo) // Save filename to DB
      .input("StartDate", sql.Date, startDate)
      .input("EndDate", sql.Date, endDate)
      .input("Status", sql.NVarChar, "Active")
      .input("AdminEmail", sql.NVarChar, adminEmail)
      .input("AdminPassword", sql.NVarChar, adminPassword).query(`
        INSERT INTO dbo.Schools 
        (SchoolName, LogoURL, StartDate, EndDate, Status, AdminEmail, AdminPassword, CreatedAt)
        VALUES (@SchoolName, @LogoURL, @StartDate, @EndDate, @Status, @AdminEmail, @AdminPassword, GETDATE())
      `);

    res.status(201).json({ message: "✅ School added successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "❌ Failed to add school.", details: err.message });
  }
}

module.exports = { handleAddSchool };
