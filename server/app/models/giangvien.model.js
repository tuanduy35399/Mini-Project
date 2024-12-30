const mongoose = require('mongoose');

const giangvienSchema = new mongoose.Schema({
    MAGV: {
        type: String,
        required: true,
        unique: true,
    },
    TENGV: String,
    GIOITINHGV: String,
    DIACHI: String,
    EMAIL: String,
    MATKHAU: String,
    QUYENTK: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    token: String,
});

module.exports = mongoose.model("GiangVien", giangvienSchema, "GIANGVIEN");