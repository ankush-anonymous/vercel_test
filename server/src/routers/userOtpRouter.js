const express = require("express");
const router = express.Router();

const { requestOTP, verifyOTP } = require("../controllers/userOtpController");

router.post("/requestOTP", requestOTP);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
