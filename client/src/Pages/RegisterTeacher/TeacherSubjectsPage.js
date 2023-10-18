import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarRegister from "../../Components/NavbarRegister";
import Select from "react-select";
import { CgDanger } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherSubjectsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTeachingMode, setSelectedTeachingMode] = useState("");
  const [selectedTeachingLevels, setSelectedTeachingLevels] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("_id");

  const subjects = [
    "Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "History",
    "Civics",
    "Economics",
    "Geography",
  ];

  const teachingLevels = ["Primary", "Secondary", "High School"];

  const handleSelectTeachingMode = (mode) => {
    setSelectedTeachingMode(mode);
  };

  const handleSelectSubject = (selectedOptions) => {
    const selectedSubjectsArray = selectedOptions.map((option) => option.value);
    setSelectedSubjects(selectedSubjectsArray);
  };

  const handleSelectTeachingLevels = (selectedOptions) => {
    const selectedLevelsArray = selectedOptions.map((option) => option.value);
    setSelectedTeachingLevels(selectedLevelsArray);
  };

  const handleExperienceChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    const formattedExperience =
      numericInput === "" ? "" : parseInt(numericInput);
    setYearsOfExperience(formattedExperience);
  };

  const handleUpdateProfile = () => {
    if (selectedSubjects.length === 0) {
      NotificationManager.error("Please select at least one subject.");
      return;
    }

    if (selectedTeachingLevels.length === 0) {
      NotificationManager.error("Please select at least one teaching level.");
      return;
    }

    if (yearsOfExperience === "") {
      NotificationManager.error("Please provide years of experience.");
      return;
    }

    if (selectedTeachingMode === "") {
      NotificationManager.error("Please select the mode of teaching.");
      return;
    }

    // Prepare data to send to the server
    const updatedData = {
      subjects: selectedSubjects,
      levelOfTeaching: selectedTeachingLevels,
      modeOfTeaching: selectedTeachingMode,
      yearsOfExperience: yearsOfExperience,
    };

    // Send data to the server for update
    const apiUrl = `api/v1/teacher/update-user/${teacherId}`;
    axios
      .patch(apiUrl, updatedData)
      .then((response) => {
        if (response.status === 200) {
          // Navigate to the next page
          navigate(`/teacher-register/experience?_id=${teacherId}`);
        } else {
          // Handle errors and show an error notification
          NotificationManager.error("Teacher profile update failed");
        }
      })
      .catch((error) => {
        NotificationManager.error(
          "An error occurred while updating teacher profile"
        );
        console.error("Error updating teacher profile:", error);
      });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-transparent h-screen">
        <NavbarRegister />
        <main className="grid grid-rows-[min-content] grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:grid-rows-[min-content] lg:gap-4">
          {/* Left Column */}
          <div className="col-span-1 p-4">
            {/* 1st row - About You Heading */}
            <div className="flex items-center justify-center p-5">
              <FaChalkboardTeacher className="text-3xl mr-3" />
              <h1 className="font-bold text-3xl">
                What do you <span className="text-orange-500">Teach?</span>
              </h1>
            </div>

            {/* 3rd row - Subject Dropdown */}
            <div className="col-span-2">
              <label className="block text-lg font-semibold">
                Subjects of Reach:
              </label>
              <Select
                isMulti
                options={subjects.map((subject) => ({
                  value: subject,
                  label: subject,
                }))}
                value={selectedSubjects.map((subject) => ({
                  value: subject,
                  label: subject,
                }))}
                onChange={handleSelectSubject}
              />
            </div>

            <div className="col-span-2 my-10">
              <label className="block text-lg font-semibold">
                Level of Teaching:
              </label>
              <Select
                isMulti
                options={teachingLevels.map((level) => ({
                  value: level,
                  label: level,
                }))}
                value={selectedTeachingLevels.map((level) => ({
                  value: level,
                  label: level,
                }))}
                onChange={handleSelectTeachingLevels}
              />
            </div>

            {/* 5th row */}
            <div className="flex items-center justify-center p-5">
              <FaChalkboardTeacher className="text-3xl mr-3" />
              <h1 className="font-bold text-3xl">
                <span className="text-orange-500">Mode</span> of Teaching?
              </h1>
            </div>

            {/* 6th row - Teaching Mode Dropdown */}
            <div className="col-span-2">
              <label className="block text-lg font-semibold">
                What do you prefer:
              </label>
              <Select
                options={[
                  { value: "Classroom Study", label: "Classroom Study" },
                  { value: "Private Tutoring", label: "Private Tutoring" },
                  { value: "Both", label: "Both" },
                ]}
                value={
                  selectedTeachingMode
                    ? {
                        value: selectedTeachingMode,
                        label: selectedTeachingMode,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setSelectedTeachingMode(selectedOption.value)
                }
              />
            </div>

            {/* 7th row - Years of Experience Input */}
            <div className="col-span-2 my-10">
              <label className="block text-lg font-semibold">
                Years of Experience:
              </label>
              <input
                type="number"
                value={yearsOfExperience}
                onChange={handleExperienceChange}
                className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="in numbers only"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center items-center mb-5">
              <button
                className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg mt-5"
                onClick={handleUpdateProfile}
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Column (Good to Know Box) */}
          <div className="lg:p-16">
            <div className="col-span-1 bg-pink-300 rounded p-4 m-2 lg:mt-0 lg:flex lg:items-start">
              <div>
                <div className="flex items-center mb-2">
                  <CgDanger className="text-orange-500 mr-2 text-2xl" />
                  <h3 className="font-bold text-xl">Good to Know</h3>
                </div>
                <p>
                  Select the subject you teach, the mode for teaching, and your
                  years of experience.
                </p>
                <p>
                  <span className="font-semibold">Private:</span> One-on-one
                  individual classes. Provide legitimate details for a better
                  experience.
                </p>
                <br />
                <p>
                  <span className="font-semibold">Classroom:</span> Multiple
                  batches of a group of students.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <NotificationContainer /> {/* Include this to display notifications */}
    </>
  );
};

export default TeacherSubjectsPage;
