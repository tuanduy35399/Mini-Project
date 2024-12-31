const express = require('express');
const SinhVien = require("../controllers/sinhvien.controller");

const router = express.Router();

router.route("/login")
    .post(SinhVien.login)
    .get(SinhVien.getAll);
router.route("/")
    .post(SinhVien.create);
router.route("/khht")
    .post(SinhVien.getKHHT);
router.route("/khht/:id")
    .put(SinhVien.updateKHHT);
router.route("/khht/add")
    .post(SinhVien.addKHHT);


module.exports = router;