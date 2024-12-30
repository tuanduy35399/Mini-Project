const mongoose = require('mongoose');

<<<<<<< HEAD
const giangvienSchema = new mongoose.Schema({
    MAGV: {
=======
const sinhvienSchema = new mongoose.Schema({
    MSSV: {
>>>>>>> 4670c94cffab996c5a2992d5c3232293d8065ba6
        type: String,
        required: true,
        unique: true,
    },
<<<<<<< HEAD
    TENGV: String,
    GIOITINHGV: String,
    DIACHI: String,
    EMAIL: String,
=======
    TENSV: String,
    NGAYSINH: Date,
    DIACHI: String,
    EMAIL: String,
    GIOITINH: String,
>>>>>>> 4670c94cffab996c5a2992d5c3232293d8065ba6
    MATKHAU: String,
    QUYENTK: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    token: String,
});

<<<<<<< HEAD
module.exports = mongoose.model("GiangVien", giangvienSchema, "GIANGVIEN");
=======
module.exports = mongoose.model("SinhVien", sinhvienSchema, "SINHVIEN");
>>>>>>> 4670c94cffab996c5a2992d5c3232293d8065ba6
