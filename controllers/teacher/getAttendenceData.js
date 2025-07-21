const { pool, poolConnect } = require("../../connection/connection");

const getAllAttendance = async (req, res) => {
  try {
    await poolConnect;
    const result = await pool
      .request()
      .query(
        "SELECT RollNo, StudentName, Date, IsPresent FROM StudentAttendance"
      );

    res.status(200).json({
      success: true,
      records: result.recordset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllAttendance };
