const { pool, poolConnect } = require("../../connection/connection");

const getSchools = async (req, res) => {
  await poolConnect;

  const result = await pool.request().query("select * from dbo.Schools");

  res.status(200).json({ record: result.recordset });
};

module.exports = getSchools;
