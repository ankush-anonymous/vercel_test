import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarRegister from "../../Components/NavbarRegister";
import { GrDocumentLocked } from "react-icons/gr";
import { CgDanger } from "react-icons/cg";
import Select from "react-select";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherQualificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("_id");

  // State to manage selected qualifications
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  // State to manage uploaded certificate
  const [certificateFile, setCertificateFile] = useState(null);

  const handleQualificationChange = (selectedOptions) => {
    setSelectedQualifications(selectedOptions);
  };

  const handleCertificateUpload = (event) => {
    const file = event.target.files[0];
    setCertificateFile(file);
  };

  // Function to send the updated teacher data to the backend
  const handleUpdateProfile = () => {
    if (!selectedQualifications.length) {
      // Show a notification using react-notifications
      NotificationManager.error("Please select at least one qualification.");
      return;
    }

    const apiUrl = `api/v1/teacher/update-user/${teacherId}`;

    // Prepare the data to send to the backend
    const updatedData = {
      nameOfQualification: selectedQualifications.map(
        (qualification) => qualification.value
      ),
    };

    // Make a PATCH request using Axios to update the teacher's profile
    axios
      .patch(apiUrl, updatedData)
      .then((response) => {
        if (response.status === 200) {
          // Handle success, e.g., show a success message to the user
          console.log("Teacher profile updated successfully");
          navigate(`/teacher-register/advertise?_id=${teacherId}`);
        } else {
          // Handle errors, e.g., show an error message
          console.error("Teacher profile update failed");
        }
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error(
          "An error occurred while updating teacher profile:",
          error
        );
      });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-transparent h-screen">
        <NavbarRegister />
        <main className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:grid-rows-[min-content] lg:gap-4">
          {/* Left Column (Document Verification) */}
          <div className="col-span-1 p-4">
            {/* 1st row - Heading */}
            <div className="flex items-center justify-center mb-10">
              <GrDocumentLocked className="text-2xl mr-3" />
              <h1 className="font-bold text-3xl">
                Document <span className="text-orange-500">Verification</span>
              </h1>
            </div>

            {/* 3rd row - Select Qualifications */}
            <div className="mb-16">
              <label className="block text-lg font-semibold mb-2">
                Select Qualifications:
              </label>
              <Select
                isMulti
                options={[
                  { value: "BSc", label: "BSc" },
                  { value: "MSc", label: "MSc" },
                  { value: "PhD", label: "PhD" },
                  // Add more qualification options here
                ]}
                value={selectedQualifications}
                onChange={handleQualificationChange}
              />
            </div>

            {/* 4th row - Certificate Upload and Upload Button */}
            <div>
              <label className="block text-lg font-semibold">
                Upload Certificate:
              </label>
              <div className="flex">
                <input
                  type="file"
                  onChange={handleCertificateUpload}
                  className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                <button
                  className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg ml-2"
                  onClick={() => {
                    // Handle the certificate upload here
                  }}
                >
                  Upload
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center mb-5 lg:mb-0 lg:mt-10">
              <button
                className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-2xl mt-10"
                onClick={handleUpdateProfile}
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Column (Good to Know Box) */}
          <div className="lg:p-16">
            <div className="col-span-1 bg-pink-300 rounded p-4 m-2 lg:flex lg:items-center lg:justify-center">
              <div>
                <div className="flex items-center mb-2">
                  <CgDanger className="text-orange-500 mr-2 text-2xl" />
                  <h3 className="font-bold text-xl">Good to Know</h3>
                </div>
                <p>
                  When uploading your certificate, make sure it is a clear and
                  legible document.
                </p>
                <p>
                  Certificate verification is an essential step to gain trust
                  from potential students.
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

export default TeacherQualificationPage;
