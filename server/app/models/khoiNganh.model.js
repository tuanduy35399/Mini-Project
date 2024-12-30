const mongoose = require('mongoose');

const khoiNganhSchema = new mongoose.Schema({
    MAKHOINGANH: {
        type: String,
        required: true,
        unique: true,
    },
    TENKHOINGANH: String,
});



module.exports = mongoose.model("KhoiNganh", khoiNganhSchema, "KHOINGANH");