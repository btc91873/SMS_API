const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter");
const schoolRouter = require("./router/schoolRouter/schoolRouter");
const super_adminRouter = require("./router/super_admin/router");
const add_new_Teacher_Routes = require("./router/super_admin/addteachersRoutes");
const show_new_teachers_list = require("./router/schooladmin_routes/get_new_teachers_listRoutes");

const classRoutes = require("./router/schooladmin_routes/classRoutes");
const sectionRoutes = require("./router/schooladmin_routes/sectionRoutes");

const app = express();
const PORT = process.env.PORT;

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.use("/api/new", loginRouter);
app.use("/api/new", teacherRouter);
app.use("/api", super_adminRouter);
app.use("/api/teacher", add_new_Teacher_Routes);
app.use("/api/schooladmin", classRoutes); //  POST /api/schooladmin/class
app.use("/api/schooladmin", sectionRoutes); // POST /api/schooladmin/section

app.use("/api/getTeachers", show_new_teachers_list);
app.use("/api/school", schoolRouter);

const mapRoute = require("./router/schooladmin_routes/mappingRoutes");
app.use("/api/schooladmin", mapRoute);

const testapi_route = require("./router/schooladmin_routes/testapiRoutes");
app.use("/api/schooladmin", testapi_route);

// Home
app.get("/", (req, res) => {
  res.send("School Management API Running...");
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
