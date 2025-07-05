const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter");

const app = express();
const PORT = process.env.PORT || 5001; // fallback if PORT not in .env

// ✅ Enable CORS before any routes or middleware
app.use(
  cors({
    origin: "http://localhost:5174", // React app URL
    credentials: true, // allow cookies/auth headers
  })
);

// ✅ Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/new", loginRouter);
app.use("/api/new", teacherRouter);

// ✅ Default Route (Optional)
app.get("/", (req, res) => {
  res.send("School Management API Running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// const express = require("express");
// require("dotenv").config();
// const PORT = process.env.PORT;
// const cors = require("cors");
// const app = express();
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
// app.use(express.json());
// const cookieParser = require("cookie-parser");
// const loginRouter = require("./router/loginRouter");
// const teacherRouter = require("./router/teacherRouter");
// app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// app.use(cookieParser());

// app.use("/api/new", loginRouter);
// app.use("/api/new", teacherRouter);

// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     credentials: true, // allow cookies/auth headers if you're using them
//   })
// );

// app.use(express.json());

// app.use(cors());

// app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// const express = require("express");
// const dotenv = require("dotenv");
// const authRoutes = require("./router/loginRouter");

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use("/api", authRoutes);

// app.get("/", (req, res) => {
//   res.send("School Management API Running...");
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
