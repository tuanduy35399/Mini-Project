const mongoose = require('mongoose');

const hocKiSchema = new mongoose.Schema({
    HOCKI: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("HocKi", hocKiSchema, 'HOCKI');