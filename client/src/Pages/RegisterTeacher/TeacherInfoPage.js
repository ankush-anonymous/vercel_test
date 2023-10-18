import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import NavbarRegister from "../../Components/NavbarRegister";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherInfoPage = () => {
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const createUserAndNavigate = () => {
    // Check if all fields are filled and email is valid
    if (!name || !email || !gender || !dateOfBirth || !phoneNumber) {
      NotificationManager.error(
        "Please fill in all fields and provide a valid email address."
      );
      return;
    }

    // Send a request to check if the phone number is registered
    axios
      .get(`/api/v1/teacher/getAllTeachers?phoneNumber=${phoneNumber}`)
      .then((response) => {
        if (response.data.count === 1) {
          // If the phone number is registered, extract _id and navigate
          const { _id } = response.data.teachers[0];
          navigate(`/teacher-register/location?_id=${_id}`);
        } else {
          // If the phone number is not registered, create a new user
          axios
            .post("http://localhost:5000/api/v1/teacher/create-user", {
              name,
              email,
              gender,
              DoB: dateOfBirth,
              phoneNumber,
            })
            .then((response) => {
              if (response.status === 201) {
                // Extract the _id from the response
                const { token } = response.data;
                const { _id } = response.data.user;

                // Log the response data
                console.log("User Created:", {
                  _id,
                  token,
                  userData: response.data.user, // Log user data
                });

                // Navigate to the next page with _id in the URL
                navigate(`/teacher-register/location?_id=${_id}`);
              } else {
                NotificationManager.error("User creation failed");
              }
            })
            .catch((error) => {
              NotificationManager.error("User creation failed");
            });
        }
      })
      .catch((error) => {
        NotificationManager.error("Failed to check phone number registration");
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail); // Update the `email` state with the input value
    if (validateEmail(inputEmail)) {
      setEmailError(""); // Reset the error message if the email is valid
    } else {
      setEmailError("Invalid email address");
    }
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName); // Update the `name` state with the input value
  };

  const handleDateOfBirthChange = (e) => {
    const inputDateOfBirth = e.target.value;
    setDateOfBirth(inputDateOfBirth); // Update the `dateOfBirth` state with the input value
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    const formattedPhoneNumber = numericInput.slice(0, 10);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleOTPChange = (e) => {
    const inputOTP = e.target.value;
    setOtp(inputOTP); // Update the `otp` state with the input value
  };

  const sendOTP = () => {
    const formattedPhoneNumber = "+91" + phoneNumber;

    // Check if the phone number is registered
    axios
      .get(`/api/v1/teacher/getAllTeachers?phoneNumber=${phoneNumber}`)
      .then((response) => {
        if (response.data.count === 0) {
          // No response data, proceed to send OTP
          console.log(response.data);

          axios
            .post("/api/v1/otp/requestOTP", {
              phoneNumber: formattedPhoneNumber,
            })
            .then((otpResponse) => {
              NotificationManager.success("OTP sent successfully");
              setShowOTPInput(true); // Show the OTP input field
            })
            .catch((otpError) => {
              NotificationManager.error("Failed to send OTP");
            });
        } else {
          // Phone number is registered
          const teachers = response.data.teachers;
          if (teachers[0].isRegistered) {
            if (teachers[0].isApproved) {
              NotificationManager.error(
                "User already registered. Please login."
              );
              navigate("/"); // Navigate to the homepage or login page
            } else {
              NotificationManager.success(
                "Your phone number is verified. Please wait until it gets approved from the admin."
              );
              navigate("/");
              setIsVerified(true);
            }
          } else {
            NotificationManager.error(
              "Number already registered. Please complete registration."
            );
            setIsVerified(true); // Set isVerified to true to enable the "Next" button
          }
        }
      })
      .catch((error) => {
        NotificationManager.error("Failed to check phone number registration");
      });
  };

  const verifyOTP = () => {
    const formattedPhoneNumber = "+91" + phoneNumber;

    console.log("Phone Number:", formattedPhoneNumber); // Log the phoneNumber
    console.log("OTP:", otp); // Log the otp

    axios
      .post("/api/v1/otp/verifyOTP", {
        phoneNumber: formattedPhoneNumber,
        otp,
      })
      .then((response) => {
        if (response.status === 200) {
          // Check the response status
          localStorage.setItem("isVerified", "true");
          setShowOTPInput(false);
          setIsVerified(true);
          NotificationManager.success("Phone Number verified successfully");
        } else {
          NotificationManager.error("OTP verification failed");
        }
      })
      .catch((error) => {
        NotificationManager.error("OTP verification failed");
      });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-transparent min-h-screen flex flex-col">
        <NavbarRegister />

        <main className="flex-grow overflow-auto max-w-screen">
          <div className="flex lg:flex">
            <div className="right-side lg:order-1 lg:w-1/2">
              {/* Heading Row */}
              <div>
                <div className="col-span-2 flex items-center justify-center p-5">
                  <FiUser className="mr-2 text-3xl" />
                  <h1 className="font-bold text-3xl">
                    <span className="text-orange-500">Personal</span>{" "}
                    Information
                  </h1>
                </div>
              </div>

              {/* Good To Know Row */}
              <div className="flex lg:hidden">
                <div className="w-2/5  flex justify-center items-end">
                  <img
                    src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697220519/TutorLok/Teacher-icon.png"
                    alt="Teacher Icon"
                    className="h-56 w-36 my-2 mx-9 p-0"
                  />
                </div>
                <div className="w-3/5 bg-pink-300 rounded p-4 m-2 mr-3 flex items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <CgDanger className="text-orange-500 mr-2 text-2xl" />
                      <h3 className="font-bold text-xl">Good to Know</h3>
                    </div>
                    <p>
                      When filling out personal details, please keep in mind, to{" "}
                      <span className="font-semibold">
                        provide legitimate details for a better experience.
                      </span>
                    </p>
                    <br />
                    <p>
                      Protecting your personal information is of utmost
                      importance. Be assured your details are safe with us.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Fields*/}
              <div className="lg:flex lg:px-20 lg:mx-10">
                <div className="col-span-2 ">
                  <div className="p-4 bg-white rounded shadow-md m-4    ">
                    <div className="grid grid-rows-[min-content] gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-gray-600 font-semibold"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={handleNameChange} // Bind the onChange handler to update `name`
                          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-gray-600 font-semibold"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleEmailChange}
                          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <span className="text-red-500">{emailError}</span>
                      </div>
                      <div>
                        <label
                          htmlFor="gender"
                          className="text-gray-600 font-semibold"
                        >
                          Gender:
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="text-gray-600 font-semibold"
                        >
                          Date of Birth:
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={handleDateOfBirthChange} // Bind the onChange handler to update `dateOfBirth`
                          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="text-gray-600 font-semibold"
                        >
                          Phone Number:
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Enter your phone number (10 digits)"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                    </div>
                    {showOTPInput && (
                      <div className="mt-3">
                        <label
                          htmlFor="otpInput"
                          className="text-gray-600 font-semibold"
                        >
                          Enter OTP sent on {phoneNumber}:
                        </label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            id="otpInput"
                            name="otpInput"
                            placeholder="6-digit OTP"
                            value={otp}
                            onChange={handleOTPChange}
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                          />
                          <button
                            className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg ml-3"
                            onClick={verifyOTP}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 my-5 text-center">
                    {isVerified ? (
                      <button
                        className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg"
                        onClick={createUserAndNavigate}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg"
                        onClick={sendOTP}
                      >
                        Verify Phone Number
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="left-side  lg:w-1/2 lg:justify-center lg:items-center lg:flex">
              {/* Image with box */}
              <div className=" hidden lg:flex">
                <div className="w-1/2  flex justify-center items-end">
                  <img
                    src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697220519/TutorLok/Teacher-icon.png"
                    alt="Teacher Icon"
                    className="h-56 w-36 my-2 mx-9 p-0"
                  />
                </div>
                <div className="w-1/2 bg-pink-300 rounded p-4 m-2 mr-3 flex items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <CgDanger className="text-orange-500 mr-2 text-2xl" />
                      <h3 className="font-bold text-xl">Good to Know</h3>
                    </div>
                    <p>
                      When filling out personal details, please keep in mind, to{" "}
                      <span className="font-semibold">
                        provide legitimate details for a better experience.
                      </span>
                    </p>
                    <br />
                    <p>
                      Protecting your personal information is of utmost
                      importance. Be assured your details are safe with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <NotificationContainer />
    </>
  );
};

export default TeacherInfoPage;
