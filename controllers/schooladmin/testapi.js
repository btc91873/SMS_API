const { sql, pool, poolConnect } = require("../../connection/connection");

const testapi = async (req, res) => {
  const { id, studentname } = req.body;

  try {
    await poolConnect;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("studentname", sql.VarChar, studentname).query(` 
        INSERT INTO test (id, studentname)
        VALUES ( @id, @studentname)
      `);

    res.status(201).json({
      message: "Class–Section mapping added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { testapi };
