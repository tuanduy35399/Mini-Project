const SinhVien = require("../models/sinhvien.model");
const Generate = require("../generate");
const md5 = require("md5");

// [GET] /api/sinhvien/
exports.getAll = async (req, res) => {
    try {
        const { name } = req.query;
        let sinhviens;
        if (name) { //findByName
            sinhviens = await SinhVien.find({
                name: { $regex: new RegExp(name), $options: "i" },
            });
        }
        else { //findAll
            sinhviens = await SinhVien.find({});
        }
        res.status(200).json(sinhviens);
    } catch (err) {
        return res.status(500).send(`Có lỗi xảy ra khi lấy ra đối tượng`);
    }
}

// [POST] /api/sinhvien/
exports.create = async (req, res) => {
    req.body.token = Generate.generateRandomString(30);
    req.body.MATKHAU = md5(req.body.MATKHAU);

    const sinhvien = new SinhVien(req.body);
    console.log(req.body);
    try {
        await sinhvien.save();
        res.status(200).json(sinhvien);
    } catch (err) {
        return res.status(500).send(`Có lỗi xảy ra khi lấy ra đối tượng`);
    }
};

// [POST] /api/sinhvien/login
exports.login = async (req, res) => {
    const MSSV = req.body.username;
    const MATKHAU = req.body.password;
    const user = await SinhVien.findOne({
        MSSV: MSSV
    });

    if (!user) {
        return res.status(400).json({ message: "MSSV không tồn tại!" });
    }

    if (md5(MATKHAU) != user.MATKHAU) {
        return res.status(400).json({ message: "Sai mật khẩu!" });
    }
    res.json({ token: user.token, role: 'sinhvien' });
};



