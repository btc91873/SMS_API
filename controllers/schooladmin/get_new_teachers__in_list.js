const { poolconnect, pool } = require("../../connection/connection");

const get_teachers = async (req, res) => {
  await poolconnect;

  const result = await pool.request().query("select * from dbo.teacherList");

  res.status(200).json({ record: result.recordset });
};

module.exports = get_teachers;
