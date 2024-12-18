const express = require('express');
const SinhVien = require("../controllers/sinhvien.controller");

const router = express.Router();

router.route("/login")
    .post(SinhVien.login)
    .get(SinhVien.getAll);
router.route("/")
    .post(SinhVien.create);

module.exports = router;