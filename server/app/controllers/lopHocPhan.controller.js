const lopHocPhan = require("../models/lopHocPhan.model");
const giangVien= require("../models/giangvien.model");
const hocPhan = require("../models/hocPhan.model");
const hocPhi = require("../models/hocPhi.model");
// [GET] /api/lopHocPhan/
exports.getAll = async (req, res) => {
    try {
        lopHocPhans = await lopHocPhan.find({})
        .populate('GIANGVIEN')
        .populate('HOCPHAN')
        .populate('HOCPHI');
        res.status(200).json(lopHocPhans);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
}