import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarRegister from "../../Components/NavbarRegister";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import axios from "axios"; // Import Axios
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherAdvertisePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("_id");

  // State to manage the ad text
  const [adText, setAdText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form is submitted

  // Function to send the updated advertisement to the backend
  const updateAdvertisement = () => {
    if (!adText) {
      // Display a notification when the field is empty
      NotificationManager.error("Fields cannot be empty", "Error");
      return;
    }

    const apiUrl = `api/v1/teacher/update-user/${teacherId}`;

    // Prepare the data to send to the backend
    const updatedData = {
      advertisementOfTeacher: adText,
      isRegistered: true, // Set isRegistered to true
    };

    // Make a PATCH request using Axios to update the teacher's advertisement
    axios
      .patch(apiUrl, updatedData)
      .then((response) => {
        if (response.status === 200) {
          // Handle success, e.g., show a success message to the user
          NotificationManager.success(
            "User Registered Successfully",
            "Success"
          );

          setIsSubmitted(true); // Update the state to mark the submission
        } else {
          // Handle errors, e.g., show an error message
          console.error("Teacher's advertisement update failed");
        }
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error(
          "An error occurred while updating teacher's advertisement:",
          error
        );
      });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-transparent h-screen ">
        <NavbarRegister />
        <main className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:grid-rows-[min-content] lg:gap-4">
          {/* Left Column */}
          <div className="col-span-1 p-4 ">
            {/* 1st row - Heading */}
            <div className="flex items-center justify-center p-5 lg:mb-10">
              <FaChalkboardTeacher className="text-3xl mr-3" />
              <h1 className="font-bold text-3xl">
                Write an <span className="text-orange-500">Ad</span> for your
                class
              </h1>
            </div>

            {/* 3rd row - Text Box for Ad */}
            <div className="mt-5 lg:mb-10">
              <label className="block text-lg font-semibold mb-2">
                Write your ad here:
              </label>
              <textarea
                rows="7"
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Write your ad here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center mb-5">
              <button
                className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg my-5"
                onClick={updateAdvertisement}
                disabled={isSubmitted}
              >
                {isSubmitted
                  ? "Profile Sent for Approval"
                  : "Submit for Approval"}
              </button>
            </div>
          </div>
          {/* Right Column (Good to Know Box) */}
          <div className="lg:flex-col lg:p-16">
            <div className="col-span-1 bg-pink-300 rounded p-4 m-2 lg:mt-0 ">
              <div>
                <div className="flex items-center mb-2">
                  <CgDanger className="text-orange-500 mr-2 text-2xl" />
                  <h3 className="font-bold text-xl">Good to Know</h3>
                </div>
                <p>
                  When creating your ad, please ensure that you provide accurate
                  and helpful information to attract potential students.
                </p>
                <p>
                  Make sure to mention your qualifications, teaching style, and
                  any other relevant details.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <NotificationContainer /> {/* React Notification Container */}
    </>
  );
};

export default TeacherAdvertisePage;
