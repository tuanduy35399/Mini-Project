const express = require('express');
const lopHocPhan = require("../controllers/lopHocPhan.controller");

const router = express.Router();

router.route("/")
    .get(lopHocPhan.getAll);

module.exports = router;