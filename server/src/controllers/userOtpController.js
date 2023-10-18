const OTP = require("../models/userOtpSchema");
const { StatusCodes } = require("http-status-codes");

const otpGenerator = require("otp-generator");

const sendOTP = require("../services/sendOTP");

const requestOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  try {
    // Store the OTP in the database
    await OTP.create({ phoneNumber, otp });

    // Send OTP to the user's phone number
    await sendOTP(phoneNumber, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const storedOTP = await OTP.findOne({ phoneNumber, otp });
    if (!storedOTP) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    console.log(storedOTP);
    // Delete the stored OTP to prevent further use
    await OTP.deleteOne({ phoneNumber, otp });

    // Here, you can generate a JWT token and return it to the client
    // for use in subsequent authenticated requests

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

module.exports = { requestOTP, verifyOTP };
