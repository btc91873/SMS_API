const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter");
const schoolRouter = require("./router/schoolRouter/schoolRouter");
const super_adminRouter = require("./router/super_admin/router");

const app = express();
const PORT = process.env.PORT || 5001; // fallback if PORT not in .env

// ✅ Enable CORS before any routes or middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true, // allow cookies/auth header
  })
);

// ✅ Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/new", loginRouter);
app.use("/api/new", teacherRouter);
app.use("/api", super_adminRouter);

//School admin dashboard
// app.use("/api/new", schoolRouter);

app.use("/api/school", schoolRouter);

// ✅ Default Route (Optional)
app.get("/", (req, res) => {
  res.send("School Management API Running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
