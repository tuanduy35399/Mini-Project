const mongoose = require('mongoose');

const hocPhanSchema = new mongoose.Schema({
    MAHOCPHAN: {
        type: String,
        required: true,
        unique: true,
    },
    TENHOCPHAN: String,
    TINCHI: Number,
    DIEUKIEN: Boolean,
    MAKHOINGANH: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KhoiNganh',
        requiered: true,
    }
});



module.exports = mongoose.model("HocPhan", hocPhanSchema, "HOCPHAN");