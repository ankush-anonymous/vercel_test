import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarRegister from "../../Components/NavbarRegister";
import { GrDocumentLocked } from "react-icons/gr";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherExperiencePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [achievements, setAchievements] = useState([""]);

  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("_id");
  console.log(teacherId);

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = value;
    setAchievements(updatedAchievements);
  };

  const handleAddAchievement = () => {
    const newAchievements = [...achievements, ""];
    setAchievements(newAchievements);
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const handleUpdateProfile = () => {
    // Prepare data to send to the server
    const updatedData = {
      achievements: achievements,
    };

    // Send data to the server for update
    const apiUrl = `api/v1/teacher/update-user/${teacherId}`;
    axios
      .patch(apiUrl, updatedData)
      .then((response) => {
        if (response.status === 200) {
          // Show a success notification
          NotificationManager.success("Teacher profile updated successfully");
          // Navigate to the next page
          navigate(`/teacher-register/qualification?_id=${teacherId}`);
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
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 grid-rows-[min-content]">
          {/* Left Column */}
          <div className="col-span-1 p-5">
            {/* About You Heading */}
            <div className="flex items-center justify-center p-5 lg:mb-10">
              <GrDocumentLocked className="text-2xl mr-3" />
              <h1 className="font-bold text-3xl">
                Your<span className="text-orange-500"> Achievements</span>
              </h1>
            </div>

            {/* Achievement Inputs */}
            {achievements.map((achievement, index) => (
              <div className="col-span-2 lg:my-3" key={index}>
                <label className="block text-lg font-semibold">
                  Achievement {index + 1} (if any):
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                  {index === achievements.length - 1 ? (
                    <button
                      className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg ml-2"
                      onClick={handleAddAchievement}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 hover-bg-red-800 text-white font-bold py-2 px-6 rounded text-lg ml-2"
                      onClick={() => handleRemoveAchievement(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Good to Know Box with Image) */}
          <div>
            <div className="col-span-1  flex lg:pt-16">
              <div className="lg:w-1/2 w-1/3 flex items-center justify-center lg:items-end">
                <img
                  src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697220519/TutorLok/Teacher-icon.png"
                  alt="Teacher Icon"
                  className="h-56 w-36 my-2 mx-9 p-0"
                />
              </div>

              <div className="lg:w-1/2 w-2/3 bg-pink-300 rounded p-4 m-2 mr-3 flex items-start">
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
        </main>

        <div className="flex justify-center items-center mb-5">
          <button
            className="bg-pink-600 hover-bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg my-5"
            onClick={handleUpdateProfile}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TeacherExperiencePage;
