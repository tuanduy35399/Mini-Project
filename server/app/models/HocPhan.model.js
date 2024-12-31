const mongoose = require('mongoose');

const hocPhanSchema = new mongoose.Schema({
    MAHOCPHAN: {
        type: String,
        required: true,
        unique: true,
    },
    TENHOCPHAN: String,
    TINCHI: String,
    DIEUKIEN: Boolean,
});

module.exports = mongoose.model("HocPhan", hocPhanSchema, 'HOCPHAN');