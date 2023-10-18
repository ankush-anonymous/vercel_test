import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const LoginTeacherPage = () => {
  const navigate = useNavigate();

  const navigateToTeacherRegister = () => {
    navigate("/teacher-register");
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    const formattedPhoneNumber = numericInput.slice(0, 10);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOTP = () => {
    const formattedPhoneNumber = "+91" + phoneNumber;

    axios
      .get(`/api/v1/teacher/getAllTeachers?phoneNumber=${phoneNumber}`)
      .then((response) => {
        if (response.data.count === 1) {
          // If the phone number is registered, check isRegistered and isApproved
          const user = response.data.teachers[0];
          if (user.isRegistered) {
            if (user.isApproved) {
              axios
                .post("/api/v1/otp/requestOTP", {
                  phoneNumber: formattedPhoneNumber,
                })
                .then((otpResponse) => {
                  NotificationManager.success("OTP sent successfully");
                  setShowOTPInput(true);
                })
                .catch((otpError) => {
                  NotificationManager.error("Failed to send OTP");
                });
            } else {
              NotificationManager.info(
                "Your profile is awaiting approval from the Admin. For any queries, please contact us."
              );
            }
          } else {
            NotificationManager.error(
              "User not registered. Please complete your registration."
            );
          }
        } else {
          NotificationManager.error(
            "User not registered. Please complete your registration."
          );
        }
      })
      .catch((error) => {
        NotificationManager.error("Failed to check phone number registration");
      });
  };

  const verifyOTP = () => {
    const formattedPhoneNumber = "+91" + phoneNumber;

    axios
      .get(`/api/v1/teacher/getAllTeachers?phoneNumber=${phoneNumber}`)
      .then((response) => {
        if (response.data.count === 1) {
          const user = response.data.teachers[0];
          const userId = user._id;
          localStorage.setItem("isVerified", "true");
          localStorage.setItem("_id", userId); // Save _id in local storage
          setShowOTPInput(false);
          setIsVerified(true);
          NotificationManager.success("OTP verified successfully");
          // Navigate to teacher dashboard
          navigate("/teacher");
          NotificationManager.success("User logged in successfully");
        } else {
          NotificationManager.error(
            "User not registered. Please complete your registration."
          );
        }
      })
      .catch((error) => {
        NotificationManager.error("Failed to verify OTP");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-pink-500">
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <img src="logo.png" alt="logo" className="w-16 mx-auto" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Request OTP</h1>
          <div>Please enter your phone number to receive an OTP</div>
        </div>
        <form className="mt-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full py-2 pl-12 pr-4 bg-opacity-30 rounded-full"
              autoFocus
              required
            />
          </div>
          {showOTPInput ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOTPChange}
                className="w-full py-2 pl-12 pr-4 bg-opacity-30 rounded-full"
                required
              />
            </div>
          ) : null}
          <button
            type="button"
            onClick={showOTPInput ? verifyOTP : requestOTP}
            className="w-full py-2 bg-black text-white rounded-full uppercase tracking-wide hover:bg-opacity-80 transition duration-500"
          >
            {showOTPInput ? "Verify" : "Request OTP"}
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>Don't have an account? </p>
          <a href="/teacher-register" className="text-blue-500 hover:underline">
            <p>Create a free account.</p>
          </a>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default LoginTeacherPage;
