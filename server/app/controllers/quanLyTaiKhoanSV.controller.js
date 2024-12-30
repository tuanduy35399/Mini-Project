const SinhVien = require("../models/sinhvien.model");
const Generate = require("../generate");
const md5 = require("md5");
const moment = require('moment');

exports.createSV = async (req, res) => {
    try {
        const { MSSV, TENSV, NGAYSINH, DIACHI, EMAIL, GIOITINH, MATKHAU, QUYENTK } = req.body;

        if(!MSSV || !TENSV || !NGAYSINH || !DIACHI || !EMAIL || !GIOITINH || !MATKHAU || !QUYENTK) {
            return res.status(400).json({message: "Thieu thong tin bat buoc"})
        }

        const formattedDate = moment(NGAYSINH, "DD/MM/YYYY").toDate();

        const sinhVienMoi = new SinhVien({
            MSSV, 
            TENSV, 
            NGAYSINH: formattedDate, 
            DIACHI, 
            EMAIL, 
            GIOITINH, 
            MATKHAU, 
            QUYENTK
        });

        await sinhVienMoi.save();

        res.status(201).json({
            message: "Sinh vien moi da them thanh cong!",
            data: sinhVienMoi
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Loi server", error: err.message});
    }
}

exports.getSV = async (req,res) => {
    try {
        const sinhVien = await SinhVien.find();
        res.json(sinhVien)
    } catch (err) {
        res.status(500).send('Error when get info')
    }
};

exports.updateSV = async (req,res) => {
    try {
        const sinhVien = await SinhVien.findByIdAndUpdate(req.params._id, req.body, {new: true})
        res.json(sinhVien)
    } catch (err){
        res.status(500).send('Error when update')
    }
}