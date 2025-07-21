// const express = require("express");
// const router = express.Router();
// // const dbConfig = require("../config/dbConfig");
 
// const {sql, pool, poolConnect} = require("../connection/connection")

//  const getAllstudents = async (req, res) => {
// try {
//     await poolConnect;

//     const schoolId = req.user?.schoolId;
// const usertype = req.user?.usertype;



//     if (!schoolId) {
//       return res.status(403).json({ message: "Access denied. No school ID found." });
//     }
//     const result = await pool
//     .request()
//      .input("SchoolId", sql.Int, schoolId)
//     .query(`
//       SELECT 
//         StudentID,
//         CONCAT(FirstName, ' ', LastName) AS FullName,
//         RollNumber,
//         Gender,
//         Class,
//         Section,
//         Phone
//       FROM 
//         dbo.Student
//           WHERE SchoolId = @SchoolId
//       ORDER BY StudentID ASC
//     `);

//     res.status(200).json(result.recordset);
//   } catch (error) {
   
//     res.status(500).json({ error: "Failed to fetch students" });
//   };

// };
// const updateStudent = async (req, res) => {
//   const { id } = req.params;
//    const readid = id.replace(":", "");
//   const {
//     firstName,
//     lastName,
//     gender,
//     dateOfBirth,
//     email,
//     phone,
//     address,
//     city,
//     state,
//     zipCode,
//     rollNumber,
//     className,
//     section,
//     admissionDate,
//     status,
//   } = req.body;

//   try {
//     await poolConnect;


//     await pool.request()
//       .input("StudentID", sql.Int, parseInt(id)) // Add this to target the student
//       .input("FirstName", sql.NVarChar(50), firstName)
//       .input("LastName", sql.NVarChar(50), lastName)
//       .input("Gender", sql.NVarChar(10), gender)
//       .input("DateOfBirth", sql.Date, dateOfBirth)
//       .input("Email", sql.NVarChar(100), email)
//       .input("Phone", sql.NVarChar(15), phone)
//       .input("Address", sql.NVarChar(255), address)
//       .input("City", sql.NVarChar(50), city)
//       .input("State", sql.NVarChar(50), state)
//       .input("ZipCode", sql.NVarChar(10), zipCode)
//       .input("RollNumber", sql.Int, rollNumber)
//       .input("Class", sql.NVarChar(50), className)
//       .input("Section", sql.NVarChar(10), section)
//       .input("AdmissionDate", sql.Date, admissionDate)
//       .input("Status", sql.NVarChar(20), status)
//       .input("UpdatedAt", sql.DateTime, new Date())
//       .input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null)

//       .query(`
//         UPDATE Student SET
//           FirstName = @FirstName,
//           LastName = @LastName,
//           Gender = @Gender,
//           DateOfBirth = @DateOfBirth,
//           Email = @Email,
//           Phone = @Phone,
//           Address = @Address,
//           City = @City,
//           State = @State,
//           ZipCode = @ZipCode,
//           RollNumber = @RollNumber,
//           Class = @Class,
//           Section = @Section,
//           AdmissionDate = @AdmissionDate,
//           Status = @Status,
//           UpdatedAt = @UpdatedAt,
//           ImageBase64 = @ImageBase64,

//         WHERE StudentID = @StudentID
//       `);

//     res.status(200).json({ message: "Student updated successfully" });
//   } catch (error) {
   
//     res.status(500).json({ error: "Failed to update student" });
//   }
// };



// const getStudentById = async (req, res) => {
//   const studentId = parseInt(req.params.id);
//   if (isNaN(studentId)) {
//     return res.status(400).json({ error: "Invalid Student ID" });
//   }

//   try {
// await poolConnect;

//     const result = await pool.request()
//       .input("StudentID", sql.Int, studentId)
//       .query("SELECT * FROM Student WHERE StudentID = @StudentID");

//     if (result.recordset.length === 0) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     res.status(200).json(result.recordset[0]);
//   } catch (error) {
    
//     res.status(500).json({ error: "Failed to fetch student" });
//   }
// };




// const addStudent = async (req, res) => {
  
//   const {
//     firstName,
//     lastName,
//     gender,
//     dateOfBirth,
//     email,
//     phone,
//     address,
//     city,
//     state,
//     zipCode,
//     rollNumber,
//     className,
//     section,
//     admissionDate,
//     status,
//     photoBase64,
//   } = req.body;
//  const schoolId = req.user?.schoolId;

//  if (!schoolId) {
//   return res.status(403).json({ message: "Unauthorized: No schoolId found" });
// }

//   try {
//    await poolConnect;
//     await pool.request()
//       .input("FirstName", sql.NVarChar(50), firstName)
//       .input("LastName", sql.NVarChar(50), lastName)
//       .input("Gender", sql.NVarChar(10), gender)
//       .input("DateOfBirth", sql.Date, dateOfBirth)
//       .input("Email", sql.NVarChar(100), email)
//       .input("Phone", sql.NVarChar(15), phone)
//       .input("Address", sql.NVarChar(255), address)
//       .input("City", sql.NVarChar(50), city)
//       .input("State", sql.NVarChar(50), state)
//       .input("ZipCode", sql.NVarChar(10), zipCode.toString()) // ensure it's a string

//       .input("RollNumber", sql.Int, parseInt(rollNumber))

//       .input("Class", sql.NVarChar(50), className)
//       .input("Section", sql.NVarChar(10), section)
//       .input("AdmissionDate", sql.Date, admissionDate)
//       .input("Status", sql.NVarChar(20), status)
//       .input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null)
//       .input("CreatedAt", sql.DateTime, new Date())
//       .input("UpdatedAt", sql.DateTime, new Date())
//       .input("SchoolId", sql.Int, schoolId) // ✅ Insert schoolId
//       .query(`
//         INSERT INTO Student (
//           FirstName, LastName, Gender, DateOfBirth, Email, Phone, Address, City, State, ZipCode, 
//           RollNumber, Class, Section, AdmissionDate, Status, ImageBase64, CreatedAt, UpdatedAt, SchoolId
//         ) VALUES (
//           @FirstName, @LastName, @Gender, @DateOfBirth, @Email, @Phone, @Address, @City, @State, @ZipCode, 
//           @RollNumber, @Class, @Section, @AdmissionDate, @Status, @ImageBase64, @CreatedAt, @UpdatedAt, @SchoolId
//         )
//       `);

//     res.status(200).json({ message: "Student added successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//     getAllstudents,
//     updateStudent,
//     addStudent,
//     getStudentById
// }



const express = require("express");
const router = express.Router();
const { sql, pool, poolConnect } = require("../connection/connection");

// ✅ Get all students
const getAllstudents = async (req, res) => {
  try {
    await poolConnect;
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({ message: "Access denied. No school ID found." });
    }

    const result = await pool
      .request()
      .input("SchoolId", sql.Int, schoolId)
      .query(`
        SELECT 
          StudentID,
          CONCAT(FirstName, ' ', LastName) AS FullName,
          RollNumber,
          Gender,
          Class,
          Section,
          Phone
        FROM dbo.Student
        WHERE SchoolId = @SchoolId
        ORDER BY StudentID ASC
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// ✅ Update student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const readid = id.replace(":", "");
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    rollNumber,
    className,
    section,
    admissionDate,
    status,
    photoBase64,
  } = req.body;

  try {
    await poolConnect;

    await pool.request()
      .input("StudentID", sql.Int, parseInt(id))
      .input("FirstName", sql.NVarChar(50), firstName)
      .input("LastName", sql.NVarChar(50), lastName)
      .input("Gender", sql.NVarChar(10), gender)
      .input("DateOfBirth", sql.Date, dateOfBirth)
      .input("Email", sql.NVarChar(100), email)
      .input("Phone", sql.NVarChar(15), phone)
      .input("Address", sql.NVarChar(255), address)
      .input("City", sql.NVarChar(50), city)
      .input("State", sql.NVarChar(50), state)
      .input("ZipCode", sql.NVarChar(10), zipCode)
      .input("RollNumber", sql.Int, parseInt(rollNumber))
      .input("Class", sql.NVarChar(50), className)
      .input("Section", sql.NVarChar(10), section)
      .input("AdmissionDate", sql.Date, admissionDate)
      .input("Status", sql.NVarChar(20), status)
      .input("UpdatedAt", sql.DateTime, new Date())
      .input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null)
      .query(`
        UPDATE Student SET
          FirstName = @FirstName,
          LastName = @LastName,
          Gender = @Gender,
          DateOfBirth = @DateOfBirth,
          Email = @Email,
          Phone = @Phone,
          Address = @Address,
          City = @City,
          State = @State,
          ZipCode = @ZipCode,
          RollNumber = @RollNumber,
          Class = @Class,
          Section = @Section,
          AdmissionDate = @AdmissionDate,
          Status = @Status,
          UpdatedAt = @UpdatedAt,
          ImageBase64 = @ImageBase64
        WHERE StudentID = @StudentID
      `);

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("❌ Update Student Error:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// ✅ Get student by ID
const getStudentById = async (req, res) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Invalid Student ID" });
  }

  try {
    await poolConnect;

    const result = await pool.request()
      .input("StudentID", sql.Int, studentId)
      .query("SELECT * FROM Student WHERE StudentID = @StudentID");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// ✅ Add student
const addStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    rollNumber,
    className,
    section,
    admissionDate,
    status,
    photoBase64,
  } = req.body;

  const schoolId = req.user?.schoolId;

  if (!schoolId) {
    return res.status(403).json({ message: "Unauthorized: No schoolId found" });
  }

  try {
    await poolConnect;

    await pool.request()
      .input("FirstName", sql.NVarChar(50), firstName)
      .input("LastName", sql.NVarChar(50), lastName)
      .input("Gender", sql.NVarChar(10), gender)
      .input("DateOfBirth", sql.Date, dateOfBirth)
      .input("Email", sql.NVarChar(100), email)
      .input("Phone", sql.NVarChar(15), phone)
      .input("Address", sql.NVarChar(255), address)
      .input("City", sql.NVarChar(50), city)
      .input("State", sql.NVarChar(50), state)
      .input("ZipCode", sql.NVarChar(10), zipCode.toString())
      .input("RollNumber", sql.Int, parseInt(rollNumber))
      .input("Class", sql.NVarChar(50), className)
      .input("Section", sql.NVarChar(10), section)
      .input("AdmissionDate", sql.Date, admissionDate)
      .input("Status", sql.NVarChar(20), status)
      .input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null)
      .input("CreatedAt", sql.DateTime, new Date())
      .input("UpdatedAt", sql.DateTime, new Date())
      .input("SchoolId", sql.Int, schoolId)
      .query(`
        INSERT INTO Student (
          FirstName, LastName, Gender, DateOfBirth, Email, Phone, Address, City, State, ZipCode,
          RollNumber, Class, Section, AdmissionDate, Status, ImageBase64, CreatedAt, UpdatedAt, SchoolId
        ) VALUES (
          @FirstName, @LastName, @Gender, @DateOfBirth, @Email, @Phone, @Address, @City, @State, @ZipCode,
          @RollNumber, @Class, @Section, @AdmissionDate, @Status, @ImageBase64, @CreatedAt, @UpdatedAt, @SchoolId
        )
      `);

    res.status(200).json({ message: "Student added successfully" });
  } catch (err) {
    console.error("❌ Add Student Error:", err); // ✅ Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllstudents,
  updateStudent,
  addStudent,
  getStudentById,
};
