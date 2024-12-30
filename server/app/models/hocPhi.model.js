const mongoose = require('mongoose');

const hocPhiSchema = new mongoose.Schema({
    MUCHOCPHI: Number,
    MAHOCKI: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HocKi',
        requiered: true,
    },
    MANAMHOC: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NamHoc',
        requiered: true,
    },
    MAKHOINGANH: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KhoiNganh',
        requiered: true,
    }
});



module.exports = mongoose.model("HocPhi", hocPhiSchema, "HOCPHI");