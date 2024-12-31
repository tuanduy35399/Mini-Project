const express = require("express");
const cors = require("cors");
const sinhvienRouter = require("./app/routes/sinhvien.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

app.use("/api/sinhvien", sinhvienRouter);

module.exports = app;


