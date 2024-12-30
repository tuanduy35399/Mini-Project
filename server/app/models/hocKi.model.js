const mongoose = require('mongoose');

const hocKiSchema = new mongoose.Schema({
    HOCKI: Number,
});



module.exports = mongoose.model("HocKi", hocKiSchema, "HOCKI");