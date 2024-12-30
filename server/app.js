const express = require("express");
const cors = require("cors");
const sinhvienRouter = require("./app/routes/sinhvien.route");
const lopHocPhanRouter = require("./app/routes/lopHocPhan.route")
const quanLyTaiKhoanSVRouter = require("./app/routes/quanLyTaiKhoanSV.route")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

app.use("/api/sinhvien", sinhvienRouter);
app.use("/api/lopHocPhan", lopHocPhanRouter);
app.use("/api/quanLyTaiKhoanSV", quanLyTaiKhoanSVRouter);

module.exports = app;
