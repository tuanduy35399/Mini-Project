const mongoose = require("mongoose");

const KHHTSchema = new mongoose.Schema({
    MAHOCPHAN: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HocPhan",
        required: true,
    },
    NAMHOC: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NamHoc",
        required: true,
    },
    HOCKI: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HocKi",
        required: true,
    },
    MSSV: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SinhVien",
        required: true,
    },
    
})

module.exports = mongoose.model("KHHT", KHHTSchema, "KHHT");