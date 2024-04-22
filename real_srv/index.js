import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import dbConnection from "./dbConfig/db.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router);

dbConnection();

app.use(express.static(path.join(__dirname, "/real_cln/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "real_cln", "dist", "index.html"));
});

//!error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Connected to port ${PORT}`);
});
