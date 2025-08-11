const { sql, pool, poolConnect } = require("../../connection/connection");
const { v4: uuidv4 } = require("uuid"); // ✅ Import UUID

const addSection = async (req, res) => {
  let { sectionName } = req.body;

  if (!sectionName || typeof sectionName !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }

  sectionName = sectionName.trim().toUpperCase();

  if (!/^[A-Z]$/.test(sectionName)) {
    return res.status(400).json({ message: "Section name must be a single alphabet letter (A–Z)." });
  }

  try {
    await poolConnect;

    // ✅ Check if section already exists
    const existing = await pool
      .request()
      .input("SectionName", sql.VarChar, sectionName)
      .query("SELECT 1 FROM Sections WHERE SectionName = @SectionName");

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Section already exists." }); // 409 Conflict
    }

    const sectionID = uuidv4();

    await pool
      .request()
      .input("SectionID", sql.VarChar, sectionID)
      .input("SectionName", sql.VarChar, sectionName)
      .query("INSERT INTO Sections (SectionID, SectionName) VALUES (@SectionID, @SectionName)");

    res.status(200).json({ message: "Section added successfully" });
  } catch (err) {
    console.error("🔥 Error adding section:", err);
    res.status(500).json({ error: err.message });
  }
};






const getSection = async (req, res) => {
  try {
    await poolConnect;
    const result = await pool
      .request()
      .query("SELECT * FROM Sections ORDER BY SectionName ASC");

    res.status(200).json({ record: result.recordset });
  } catch (err) {
    console.error("❌ Get Section Error:", err); // Add logging
    res.status(500).json({ error: err.message });
  }
};


const deleteSection = async (req, res) => {
  const sectionId = req.params.id;

  try {
    await poolConnect;

    const result = await pool
      .request()
      .input("SectionID", sql.VarChar, sectionId)
      .query("DELETE FROM Sections WHERE SectionID = @SectionID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { addSection, getSection, deleteSection };