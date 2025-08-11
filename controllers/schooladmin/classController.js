const { sql, pool, poolConnect } = require("../../connection/connection");
const { v4: uuidv4 } = require("uuid");

const addClass = async (req, res) => {
  const { name, description } = req.body;
  const classID = uuidv4();

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
      classID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getClass = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request()
      .query("SELECT ClassID, ClassName, Description FROM dbo.Classes ORDER BY TRY_CAST(ClassName AS INT) ASC");



    res.status(200).json({ record: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClass = async (req, res) => {
  const classId = req.params.id;
  const { ClassName, Description } = req.body;

  try {
    await poolConnect;

    await pool
      .request()
      .input("ClassID", sql.VarChar, classId)
      .input("ClassName", sql.NVarChar, ClassName)
      .input("Description", sql.NVarChar, Description)
      .query(`
        UPDATE dbo.classes
        SET ClassName = @ClassName,
            Description = @Description
        WHERE ClassID = @ClassID
      `);

    res.status(200).json({ message: "Class updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClass = async (req, res) => {
  const classId = req.params.id;

  try {
    await poolConnect;

    await pool
      .request()
      .input("ClassID", sql.VarChar, classId)
      .query("DELETE FROM Classes WHERE ClassID = @ClassID");

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    console.error("Error deleting class:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = { addClass, getClass, updateClass, deleteClass };
