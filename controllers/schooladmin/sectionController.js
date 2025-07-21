const { sql, pool, poolConnect } = require("../../connection/connection");
const { v4: uuidv4 } = require("uuid"); // ✅ Import UUID

const addSection = async (req, res) => {
  const { sectionName } = req.body;
  const sectionID = uuidv4(); // ✅ Generate unique ClassID

  try {
    await poolConnect;

    await pool
      .request()
      .input("SectionID", sql.VarChar, sectionID)
      .input("SectionName", sql.VarChar, sectionName)
      .query(
        "INSERT INTO Sections (SectionID, SectionName) VALUES (@SectionID, @SectionName)"
      );

    res.status(200).json({
      message: "Section added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSection = async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query("select * from dbo.Sections");
    res.status(200).json({ record: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSection, getSection };
