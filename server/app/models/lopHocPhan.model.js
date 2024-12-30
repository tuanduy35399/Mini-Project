const mongoose = require('mongoose');

const lopHocPhanSchema = new mongoose.Schema({
    MALOPHP: {
        type: String,
        require: true,
        unique: true,
    },
    TIETBATDAU: Number,
    THUTRONGTUAN: Number,
    SISO: Number,
    SOTIET: Number,
    HOCPHAN: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HocPhan',
        require: true,
    },
    HOCPHI: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HocPhi',
        require: true,
    },
    HOCKI: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HocKi',
        require: true,
    },
    NAMHOC: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NamHoc',
        require: true,
    },
    GIANGVIEN: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GiangVien',
        require: true,
    }
});



module.exports = mongoose.model("LopHocPhan", lopHocPhanSchema, "LOPHOCPHAN");