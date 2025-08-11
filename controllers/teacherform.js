
const { sql, pool, poolConnect } = require("../connection/connection");

const getAllTeachers = async (req, res) => {
  try {
    await poolConnect;

    const schoolId = req.user?.schoolId;
    const usertype = req.user?.usertype;



    if (!schoolId) {
      return res.status(403).json({ message: "Access denied. No school ID found." });
    }

    const result = await pool
      .request()
      .input("SchoolId", sql.Int, schoolId)
      .query(`
        SELECT 
          TeacherID,
          CONCAT(FirstName, ' ', LastName) AS FullName,
          Email,
          Gender,
          Status,
          subjectSpecialization,
          PhoneNumber
        FROM dbo.Teacher
        WHERE SchoolId = @SchoolId
        ORDER BY TeacherID ASC
      `);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher list", error });
  }
};


// ✅ Get teacher by ID
const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    await poolConnect;
    const result = await pool
      .request()
      .input("TeacherID", sql.Int, id)
      .query("SELECT * FROM Teacher WHERE TeacherID = @TeacherID");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher", error });
  }
};

// ✅ Add teacher
const addTeacher = async (req, res) => {

  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    address,
    subjectSpecialization,
    qualification,
    joiningDate,
    experienceYears,
    status,
    photoBase64,
  } = req.body;
  const schoolId = req.user?.schoolId;

  if (!schoolId) {
    return res.status(403).json({ message: "Unauthorized: No schoolId found" });
  }
  try {
    await poolConnect;
    const request = pool.request();

    request.input("FirstName", sql.NVarChar(50), firstName);
    request.input("LastName", sql.NVarChar(50), lastName);
    request.input("Gender", sql.NVarChar(10), gender);
    request.input("DateOfBirth", sql.Date, dateOfBirth);
    request.input("PhoneNumber", sql.NVarChar(15), phoneNumber);
    request.input("Email", sql.NVarChar(100), email);
    request.input("Address", sql.NVarChar(255), address);
    request.input("SubjectSpecialization", sql.NVarChar(100), subjectSpecialization);
    request.input("Qualification", sql.NVarChar(100), qualification);
    request.input("JoiningDate", sql.Date, joiningDate);
    request.input("ExperienceYears", sql.Int, experienceYears || 0);
    request.input("Status", sql.NVarChar(50), status);
    request.input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null);
    request.input("SchoolId", sql.Int, schoolId); // ✅ Insert schoolId


    await request.query(`
      INSERT INTO Teacher (
  FirstName, LastName, Gender, DateOfBirth,
  PhoneNumber, Email, Address, SubjectSpecialization,
  Qualification, JoiningDate, ExperienceYears, Status, ImageBase64, SchoolId
) VALUES (
  @FirstName, @LastName, @Gender, @DateOfBirth,
  @PhoneNumber, @Email, @Address, @SubjectSpecialization,
  @Qualification, @JoiningDate, @ExperienceYears, @Status, @ImageBase64, @SchoolId
)

    `);

    res.status(200).json({ message: "✅ Teacher added with Base64 image" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting teacher", error });
  }
};

// ✅ Update teacher
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const readid = id.replace(":", "");
  const {
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    PhoneNumber,
    Email,
    Address,
    SubjectSpecialization,
    Qualification,
    JoiningDate,
    ExperienceYears,
    Status,
    photoBase64,
  } = req.body;

  try {
    await poolConnect;
    const request = pool.request();

    request.input("TeacherID", sql.Int, readid);
    request.input("FirstName", sql.NVarChar(50), FirstName);
    request.input("LastName", sql.NVarChar(50), LastName);
    request.input("Gender", sql.NVarChar(10), Gender);
    request.input("DateOfBirth", sql.Date, DateOfBirth);
    request.input("PhoneNumber", sql.NVarChar(15), PhoneNumber);
    request.input("Email", sql.NVarChar(100), Email);
    request.input("Address", sql.NVarChar(255), Address);
    request.input("SubjectSpecialization", sql.NVarChar(100), SubjectSpecialization);
    request.input("Qualification", sql.NVarChar(100), Qualification);
    request.input("JoiningDate", sql.Date, JoiningDate);
    request.input("ExperienceYears", sql.Int, ExperienceYears || 0);
    request.input("Status", sql.NVarChar(50), Status);
    request.input("ImageBase64", sql.NVarChar(sql.MAX), photoBase64 || null);

    await request.query(`
      UPDATE dbo.Teacher SET
        FirstName = @FirstName,
        LastName = @LastName,
        Gender = @Gender,
        DateOfBirth = @DateOfBirth,
        PhoneNumber = @PhoneNumber,
        Email = @Email,
        Address = @Address,
        SubjectSpecialization = @SubjectSpecialization,
        Qualification = @Qualification,
        JoiningDate = @JoiningDate,
        ExperienceYears = @ExperienceYears,
        Status = @Status,
        ImageBase64 = @ImageBase64
      WHERE TeacherID = @TeacherID
    `);

    res.status(200).json({ message: "✅ Teacher updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};


// here is the count no. and more details of the teacher

const getTeacherCounts = async (req, res) => {
  try {
    await poolConnect;
    const schoolId = req.user.schoolId;

    const result = await pool
      .request()
      .input("SchoolId", sql.Int, schoolId)
      .query(`SELECT COUNT(*) AS count FROM dbo.Teacher WHERE SchoolId = @SchoolId`);

    res.status(200).json({ count: result.recordset[0].count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teacher count", err });
  }
};
///////////////kkk//////////l///////////ll

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  getTeacherCounts,
};
