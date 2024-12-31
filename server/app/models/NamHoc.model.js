const mongoose = require('mongoose');

const namHocSchema = new mongoose.Schema({
    NAMHOC: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("NamHoc", namHocSchema, 'NAMHOC');