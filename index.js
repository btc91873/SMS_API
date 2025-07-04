require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const teacherRouter = require("./router/teacherRouter");
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cookieParser());

app.use("/api/new", loginRouter);
app.use("/api/new", teacherRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
