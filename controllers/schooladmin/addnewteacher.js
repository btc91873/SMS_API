// const { sql , pool ,poolConnect} = require("../../connection/connection");

// const result = async (req , res ) => {

//  const { fullName, email , password , primarySubject , phonenumber  } = req.body

//   await poolConnect

//   await pool
//   .request().input("")
// }

const { sql, pool, poolConnect } = require("../../connection/connection");

const addTeacher = async (req, res) => {
  await poolConnect;

  const { fullName, primarySubject, email, password, phoneNumber } = req.body;

  try {
    const result = await pool
      .request()
      .input("FullName", sql.NVarChar(100), fullName)
      .input("PrimarySubject", sql.NVarChar(100), primarySubject)
      .input("Email", sql.NVarChar(100), email)
      .input("Password", sql.NVarChar(100), password)
      .input("PhoneNumber", sql.NVarChar(20), phoneNumber).query(`
        INSERT INTO teacherList 
    ([fullName], [primarySubject], [email], [password], [phoneNumber], [status], [createdAt])
  VALUES 
    (@FullName, @PrimarySubject, @Email, @Password, @PhoneNumber, 'Active', GETDATE())
      `);

    res.status(200).json({ message: "Teacher added successfully" });
  } catch (err) {
    console.error(" Error inserting teacher:", err); // shows full SQL error in terminal
    res.status(500).json({
      error: "Failed to add teacher",
      message: err.message,
      sqlMessage: err.originalError?.info?.message || "No SQL error message",
    });
  }
};

module.exports = addTeacher;
