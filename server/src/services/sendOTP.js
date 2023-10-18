const twilio = require("twilio");

const accountSid = "AC9a00bbb661b3a2b32b13257725ebd48d";
const authToken = "a4b55d915edf515e69801e1dfcd3351e";
const twilioPhoneNumber = +12763294161; // This is the phone number you got from Twilio

const client = twilio(accountSid, authToken);

const sendOTP = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12763294161",
      to: phoneNumber,
    });

    console.log(`OTP sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Failed to send OTP to ${phoneNumber}:`, error);
    throw error;
  }
};

module.exports = sendOTP;
