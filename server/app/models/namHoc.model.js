const mongoose = require('mongoose');

const namHocSchema = new mongoose.Schema({
    NAMHOC: String,
});



module.exports = mongoose.model("NamHoc", namHocSchema, "NAMHOC");