const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// ✅ Import Routers
const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter"); // ✅ includes edit routes now
const studentRouter = require("./router/studentRouter");
const schoolRouter = require("./router/schoolRouter/schoolRouter");
const super_adminRouter = require("./router/super_admin/router");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware setup
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ React frontend
    credentials: true,
  })
);

// ✅ Static file serving (for any uploaded files, if needed)
app.use("/uploads", express.static("uploads"));

// ✅ Route Registrations
app.use("/api/new", loginRouter); 
app.use("/api/new", teacherRouter);     
app.use("/api/new/student", studentRouter);
app.use("/api", super_adminRouter);
app.use("/api/school", schoolRouter);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ School Management API is running...");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
