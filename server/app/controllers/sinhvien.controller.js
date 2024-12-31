const SinhVien = require("../models/SinhVien.model");
const KHHT = require("../models/KHHT.model");
const Generate = require("../generate");
const md5 = require("md5");
// const MSSV = require("../models/SinhVien.model");
const NAMHOC = require("../models/NamHoc.model");
const HOCKI = require("../models/HocKi.model");
const HOCPHAN = require("../models/HocPhan.model");
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

exports.getKHHT = async (req, res) => {
    try{
        console.log("reqbody: ", req.body);
        const {id,namhoc,hocki} = req.body;
        const filter= {};
        if(id) {
            filter.MSSV = id;
        }
        if(namhoc) {
            filter.NAMHOC =namhoc;
        }
        if(hocki) {
            filter.HOCKI =hocki;
        };
        const aa = await KHHT.find(filter)
            .populate("MSSV")
            .populate("NAMHOC")
            .populate("HOCKI")
            .populate("MAHOCPHAN")
            .exec();
        console.log(aa)
        res.status(200).json({
            message: "Lấy dữ liệu thành công",
            data: aa,
        });
    } catch(error) {
        res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy ra đối tượng',
            error,
        });
    }
};


// [PUT] /api/sinhvien/khht/:id
exports.updateKHHT = async (req, res) => {
    try {
        const { id } = req.params;
        const { namhoc, hocki } = req.body;

        if (!namhoc || !hocki) {
            return res.status(400).json({ message: "Vui lòng cung cấp năm học và học kỳ mới." });
        }

        const updatedKHHT = await KHHT.findByIdAndUpdate(
            id,
            { NAMHOC: namhoc, HOCKI: hocki },
            { new: true }
        )
            .populate("MSSV")
            .populate("NAMHOC")
            .populate("HOCKI")
            .populate("MAHOCPHAN");

        if (!updatedKHHT) {
            return res.status(404).json({ message: "Không tìm thấy kế hoạch học tập cần cập nhật." });
        }

        res.status(200).json({
            message: "Cập nhật kế hoạch học tập thành công.",
            data: updatedKHHT,
        });
    } catch (error) {
        res.status(500).json({
            message: "Có lỗi xảy ra khi cập nhật kế hoạch học tập.",
            error,
        });
    }
};

// [POST] /api/sinhvien/khht/add
exports.addKHHT = async (req, res) => {
    try {
        const { MSSV, MAHOCPHAN, NAMHOC, HOCKI } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!MSSV || !MAHOCPHAN || !NAMHOC || !HOCKI) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        // Kiểm tra xem học phần đã được thêm vào kế hoạch học tập chưa
        const existingKHHT = await KHHT.findOne({ MSSV, MAHOCPHAN, NAMHOC, HOCKI });
        if (existingKHHT) {
            return res.status(400).json({ message: "Học phần này đã có trong kế hoạch học tập." });
        }

        // Tạo mới kế hoạch học tập
        const newKHHT = new KHHT({
            MSSV,
            MAHOCPHAN,
            NAMHOC,
            HOCKI,
        });

        await newKHHT.save();
        res.status(201).json({
            message: "Thêm học phần vào kế hoạch học tập thành công.",
            data: newKHHT,
        });
    } catch (error) {
        res.status(500).json({
            message: "Có lỗi xảy ra khi thêm học phần vào kế hoạch học tập.",
            error,
        });
    }
};
// [GET] /api/sinhvien/khht/years
exports.getYears = async (req, res) => {
    try {
        const years = await NAMHOC.find({});
        const semesters = await HOCKI.find({});
        res.status(200).json({ years, semesters });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy năm học và học kỳ', error });
    }
};
// [GET] /api/sinhvien/khht/courses
exports.getCoursesByYearAndSemester = async (req, res) => {
    const { NAMHOC, HOCKI } = req.query;
    try {
        const courses = await KHHT.find({ NAMHOC, HOCKI }).populate('MAHOCPHAN').exec();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy học phần của năm học và học kỳ', error });
    }
};
// [DELETE] /api/sinhvien/khht/remove
exports.removeCourse = async (req, res) => {
    const { MSSV, MAHOCPHAN, NAMHOC, HOCKI } = req.body;
    try {
        await KHHT.findOneAndDelete({ MSSV, MAHOCPHAN, NAMHOC, HOCKI });
        res.status(200).json({ message: 'Học phần đã được xóa khỏi kế hoạch học tập.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa học phần khỏi kế hoạch học tập', error });
    }
};
// [POST] /api/sinhvien/khht/add
exports.addCourseToPlan = async (req, res) => {
    const { MSSV, MAHOCPHAN, NAMHOC, HOCKI } = req.body;
    try {
        const existingKHHT = await KHHT.findOne({ MSSV, MAHOCPHAN, NAMHOC, HOCKI });
        if (existingKHHT) {
            return res.status(400).json({ message: 'Học phần đã có trong kế hoạch học tập.' });
        }
        
        const newKHHT = new KHHT({ MSSV, MAHOCPHAN, NAMHOC, HOCKI });
        await newKHHT.save();
        res.status(201).json({ message: 'Học phần đã được thêm vào kế hoạch học tập.', data: newKHHT });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm học phần vào kế hoạch học tập.', error });
    }
};

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

