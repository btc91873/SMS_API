const { sql, pool, poolConnect } = require("../../connection/connection");

const getLiveClasses = async (req, res) => {
    // controllers/schooladmin/liveController.js

    const getLiveDashboardData = async (req, res) => {
        try {
            const { schoolId } = req.user;

            const result = await pool.request()
                .input("SchoolID", sql.Int, schoolId)
                .query(`
        SELECT 
          cm.ClassName, cm.SectionName, cm.TeacherName,
          cm.SubjectName, cm.TopicName, cm.Period, 
          cm.Attendance, cm.Status
        FROM dbo.ClassMapping cm
        WHERE cm.Status = 'Live' AND cm.SchoolID = @SchoolID
      `);

            res.status(200).json({ liveClasses: result.recordset });
        } catch (err) {
            console.error("Live class fetch error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}
module.exports = { getLiveClasses }
