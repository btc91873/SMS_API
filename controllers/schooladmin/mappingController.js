const { v4: uuidv4 } = require("uuid");
const { sql, pool, poolConnect } = require("../../connection/connection");

const mapClassSection = async (req, res) => {
  const { classID, sectionID } = req.body;
  const mapID = uuidv4();

  try {
    await poolConnect;

    await pool
      .request()
      .input("MapID", sql.VarChar, mapID)
      .input("ClassID", sql.VarChar, classID)
      .input("SectionID", sql.VarChar, sectionID).query(` 
        INSERT INTO ClassSectionMap (MapID, ClassID, SectionID)
        VALUES (@MapID, @ClassID, @SectionID)
      `);

    res.status(201).json({
      message: "Class–Section mapping added successfully",
      mapID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mapClassSection };
