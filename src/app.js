const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  withCredentials: true
}));
app.use(cookieParser());

app.use("/api/auth", require("./routes/userRoute"));

module.exports = app;
