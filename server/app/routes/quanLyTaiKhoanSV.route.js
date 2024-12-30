const express = require('express');
const quanLyTaiKhoanSV = require("../controllers/quanLyTaiKhoanSV.controller");
const capNhatThongTin = require("../controllers/quanLyTaiKhoanSV.controller");

const router = express.Router();

router.route("/taoTaiKhoan")
    .post(quanLyTaiKhoanSV.createSV);

router.route("/capNhatThongTin") 
    .get(capNhatThongTin.getSV)

router.route("/capNhatThongTin/:_id") 
    .put(capNhatThongTin.updateSV); 

module.exports = router;