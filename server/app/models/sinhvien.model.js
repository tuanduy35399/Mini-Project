const mongoose = require('mongoose');
const md5 = require('md5');

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
    GIOITINH: Boolean,
    MATKHAU: String,
    QUYENTK: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    token: String,
});

// sinhvienSchema.pre("save", async function (next) {
//     if (this.isModified("MATKHAU")) {
//         this.MATKHAU = md5(MATKHAU);
//     }
//     next();
// });

module.exports = mongoose.model("SinhVien", sinhvienSchema, "SINHVIEN");