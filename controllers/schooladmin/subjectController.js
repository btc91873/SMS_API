const { sql, pool, poolConnect } = require("../../connection/connection");

const addSubject = async (req, res) => {
    let { subjectName } = req.body;


    if (!subjectName || typeof subjectName !== "string") {
        return res.status(400).json({ message: "Invalid subject name" });
    }

    subjectName = subjectName.trim().toUpperCase();
    const schoolId = req.user.schoolId; // Get school ID from token

    console.log("🧪 Incoming subjectName:", subjectName);
    console.log("🏫 SchoolID from token:", schoolId);
    try {
        await poolConnect;

        // Check for existing subject for this school
        const existing = await pool
            .request()
            .input("SubjectName", sql.NVarChar, subjectName)
            .input("SchoolID", sql.Int, schoolId)
            .query("SELECT 1 FROM Subject WHERE SubjectName = @SubjectName AND SchoolID = @SchoolID");

        if (existing.recordset.length > 0) {
            return res.status(409).json({ message: "Subject already exists for this school" });
        }

        // Insert subject
        await pool
            .request()
            .input("SubjectName", sql.NVarChar, subjectName)
            .input("SchoolID", sql.Int, schoolId)
            .query("INSERT INTO Subject (SubjectName, SchoolID) VALUES (@SubjectName, @SchoolID)");

        res.status(200).json({ message: "Subject added successfully" });
    } catch (err) {
        console.error("🔥 Error adding subject:", err);
        res.status(500).json({ error: err.message });
    }
};

const getSubject = async (req, res) => {
    try {
        await poolConnect;
        const schoolId = req.user.schoolId;

        const result = await pool
            .request()
            .input("SchoolID", sql.Int, schoolId)
            .query("SELECT * FROM Subject WHERE SchoolID = @SchoolID ORDER BY SubjectName ASC");

        res.status(200).json({ subjects: result.recordset });
    } catch (err) {
        console.error("❌ Get Subject Error:", err);
        res.status(500).json({ error: err.message });
    }
};

const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;

    try {
        await poolConnect;

        const result = await pool
            .request()
            .input("SubjectID", sql.Int, subjectId)
            .input("SchoolID", sql.Int, req.user.schoolId)
            .query("DELETE FROM Subject WHERE SubjectID = @SubjectID AND SchoolID = @SchoolID")


        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addSubject, getSubject, deleteSubject };
