const mongoose = require('mongoose');

const sinhvienSchema = new mongoose.Schema({
    MSSV: {
        type: String,
        required: true,
        unique: true,
    },
    TENSV: String,
    NGAYSINH: Date,
    DIACHI: String,
    EMAIL: String,
    GIOITINH: String,
    MATKHAU: String,
    QUYENTK: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    token: String,
});

module.exports = mongoose.model("SinhVien", sinhvienSchema, "SINHVIEN");