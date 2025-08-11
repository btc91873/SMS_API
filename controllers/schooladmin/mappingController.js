const { sql, pool, poolConnect } = require("../../connection/connection");

const getAllClassMapping = async (req, res) => {

  console.log("hello")

  try {
    await poolConnect;

    const schoolId = req.user?.schoolId;
    if (!schoolId) {
      return res.status(401).json({ message: "Unauthorized: schoolId missing" });
    }

    const result = await pool
      .request()
      .input("SchoolID", sql.Int, schoolId)
      .query(`
        SELECT 
          cm.MappingID,
          cm.Class,
          cm.Section,
          cm.Subject,
          cm.DayOfWeek,
          cm.Period,
          cm.TeacherID,
          t.FirstName + ' ' + t.LastName AS TeacherName
        FROM 
  ClassMapping cm
LEFT JOIN 
  Teacher t ON cm.TeacherID = t.TeacherID

        WHERE 
          cm.SchoolID = @SchoolID
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching class mappings:", error);
    res.status(500).json({ message: "Error fetching class mappings" });
  }
};



const addClassMapping = async (req, res) => {
  console.log("✅ addClassMapping controller hit");
  console.log("Received payload:", req.body);

  const {
    Class,
    Section,
    Subject,
    TeacherID,
    DayOfWeek,
    Period,
    SchoolID
  } = req.body;
  console.log(Class, Section, Subject, TeacherID, DayOfWeek, Period, SchoolID)
  try {
    await poolConnect;
    await pool
      .request()
      .input("Class", sql.NVarChar, Class)
      .input("Section", sql.NVarChar, Section)
      .input("Subject", sql.NVarChar, Subject)
      .input("TeacherID", sql.NVarChar, TeacherID)
      .input("DayOfWeek", sql.NVarChar, DayOfWeek)
      .input("Period", sql.NVarChar, Period)
      .input("SchoolID", sql.NVarChar, SchoolID)
      .query(
        `INSERT INTO dbo.ClassMapping(Class, Section, Subject, TeacherID, DayOfWeek, Period,SchoolID)
         VALUES (@Class, @Section, @Subject, @TeacherID, @DayOfWeek, @Period, @SchoolID)`
      );

    res.status(201).json({ message: "Class mapping added successfully" });
  } catch (error) {
    console.error("Error adding class mapping:", error);
    res.status(500).json({ error: "Failed to add class mapping" });
  }
};


const updateClassMapping = async (req, res) => {
  const { id } = req.params;
  const { Class, Section, Subject, TeacherID, DayOfWeek, Period } = req.body;

  try {
    await poolConnect;
    const result = await pool
      .request()
      .input("MappingID", sql.Int, id)
      .input("Class", sql.NVarChar, Class)
      .input("Section", sql.NVarChar, Section)
      .input("Subject", sql.NVarChar, Subject)
      .input("TeacherID", sql.Int, TeacherID)
      .input("DayOfWeek", sql.NVarChar, DayOfWeek)
      .input("Period", sql.NVarChar, Period)
      .query(`
        UPDATE ClassMapping
        SET Class = @Class,
            Section = @Section,
            Subject = @Subject,
            TeacherID = @TeacherID,
            DayOfWeek = @DayOfWeek,
            Period = @Period
        WHERE MappingID = @MappingID
      `);

    res.status(200).json({ message: "Mapping updated successfully" });
  } catch (error) {
    console.error("Error updating mapping:", error);
    res.status(500).json({ error: "Failed to update class mapping" });
  }
};


const deleteClassMapping = async (req, res) => {
  const mappingID = req.params.id;

  try {
    await poolConnect;

    const result = await pool.request()
      .input("MappingID", sql.Int, mappingID)
      .query("DELETE FROM ClassMapping WHERE MappingID = @MappingID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    res.status(200).json({ message: "Mapping deleted successfully" });
  } catch (err) {
    console.error("Error deleting class mapping:", err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllClassMapping,
  addClassMapping,
  updateClassMapping,
  deleteClassMapping,
};
