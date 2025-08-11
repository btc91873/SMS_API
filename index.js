const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const listEndpoints = require('express-list-endpoints');

require("dotenv").config();

// ✅ Import Routers
const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter"); // ✅ includes edit routes now
const studentRouter = require("./router/studentRouter");
const schoolRouter = require("./router/schoolRouter/schoolRouter");
const super_adminRouter = require("./router/super_admin/router");
const add_new_Teacher_Routes = require("./router/super_admin/addteachersRoutes");
const show_new_teachers_list = require("./router/schooladmin_routes/get_new_teachers_listRoutes");

const liveRoutes = require("./router/schooladmin_routes/liveRoutes");

const classRoutes = require("./router/schooladmin_routes/classRoutes");
const sectionRoutes = require("./router/schooladmin_routes/sectionRoutes");
const subjectRoutes = require("./router/schooladmin_routes/subjectRoutes");
const app = express();

const PORT = process.env.PORT;
// ✅ Middlewares
// ✅ Middleware setup
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
app.use("/api/teacher", add_new_Teacher_Routes);
app.use("/api/schooladmin", classRoutes); //  POST /api/schooladmin/class
app.use("/api/schooladmin", sectionRoutes); // POST /api/schooladmin/section
app.use("/api/schooladmin", subjectRoutes);


app.use("/api/schooladmin", liveRoutes); // GET /api/schooladmin/live-classes


app.use("/api/getTeachers", show_new_teachers_list);
app.use("/api/school", schoolRouter);//

// ✅ Health check route
const mapRoute = require("./router/schooladmin_routes/mappingRoutes");
app.use("/api/schooladmin", mapRoute);

const testapi_route = require("./router/schooladmin_routes/testapiRoutes");
app.use("/api/schooladmin", testapi_route);

// Home
app.get("/", (req, res) => {
  res.send("✅ School Management API is running...");
});

console.log(listEndpoints(app));


// Server Start
// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
