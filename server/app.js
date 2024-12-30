const express = require("express");
const cors = require("cors");
const sinhvienRouter = require("./app/routes/sinhvien.route");
<<<<<<< HEAD
const lopHocPhanRouter = require("./app/routes/lopHocPhan.route")
const quanLyTaiKhoanSVRouter = require("./app/routes/quanLyTaiKhoanSV.route")
=======

>>>>>>> 4670c94cffab996c5a2992d5c3232293d8065ba6
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

app.use("/api/sinhvien", sinhvienRouter);
<<<<<<< HEAD
app.use("/api/lopHocPhan", lopHocPhanRouter);
app.use("/api/quanLyTaiKhoanSV", quanLyTaiKhoanSVRouter);
=======
>>>>>>> 4670c94cffab996c5a2992d5c3232293d8065ba6

module.exports = app;
