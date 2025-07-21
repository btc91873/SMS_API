// const { sql, pool, poolConnect } = require("../../connection/connection");

// const addClass = async (req, res) => {
//   const { className, description } = req.body;
//   try {
//     await poolConnect;
//     await pool
//       .request()
//       .input("ClassName", sql.VarChar, className)
//       .input("Description", sql.VarChar, description)
//       .query(
//         "INSERT INTO Classes (ClassName, Description) VALUES (@ClassName, @Description)"
//       );

//     res.status(201).json({ message: "Class added successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { addClass };

const { sql, pool, poolConnect } = require("../../connection/connection");
const { v4: uuidv4 } = require("uuid"); // ✅ Import UUID

const addClass = async (req, res) => {
  const { name, description } = req.body;
  const classID = uuidv4(); // ✅ Generate unique ClassID

  try {
    await poolConnect;

    await pool
      .request()
      .input("ClassID", sql.VarChar, classID)
      .input("ClassName", sql.VarChar, name)
      .input("Description", sql.VarChar, description)
      .query(
        "INSERT INTO Classes (ClassID, ClassName, Description) VALUES (@ClassID, @ClassName, @Description)"
      );

    res.status(200).json({
      message: "Class added successfully",
      classID, // ✅ Return the new ID
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getClass = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query("select * from dbo.Sections");

    res.status(200).json({ record: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addClass, getClass };
