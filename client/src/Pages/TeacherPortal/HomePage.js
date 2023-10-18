import React, { useState, useEffect } from "react";
import TeacherNavbar from "../../Components/TeacherNavbar";
import axios from "axios";

const HomePage = () => {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Fetch teacher data from the API using the userId
    const userId = localStorage.getItem("_id");

    axios.get(`api/v1/teacher/getSingleTeacher/${userId}`).then((response) => {
      if (response.data && response.data.user) {
        setTeacherData(response.data.user);
      }
    });
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen">
        <TeacherNavbar />
        <main>
          <div className="flex flex-col">
            <div className="bg-gray-200 p-4">
              <h1 className="text-2xl font-bold">
                Hi, {teacherData ? teacherData.name : "User"}
              </h1>
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">Teacher Details</h2>
              <ul>
                <li>
                  <strong>Name:</strong> {teacherData ? teacherData.name : ""}
                </li>
                <li>
                  <strong>Email:</strong> {teacherData ? teacherData.email : ""}
                </li>
                <li>
                  <strong>Gender:</strong>{" "}
                  {teacherData ? teacherData.gender : ""}
                </li>
                <li>
                  <strong>Date of Birth:</strong>{" "}
                  {teacherData ? teacherData.dateOfBirth : ""}
                </li>
                <li>
                  <strong>Phone Number:</strong>{" "}
                  {teacherData ? teacherData.phoneNumber : ""}
                </li>
                <li>
                  <strong>Address:</strong>{" "}
                  {teacherData
                    ? `${
                        teacherData.teachersAddress?.buildingOrHouseNumber || ""
                      }, ${teacherData.teachersAddress?.locality || ""}, ${
                        teacherData.teachersAddress?.city || ""
                      }, ${teacherData.teachersAddress?.state || ""}, ${
                        teacherData.teachersAddress?.pinCode || ""
                      }`
                    : ""}
                </li>
                <li>
                  <strong>Hotspots:</strong>{" "}
                  {teacherData ? teacherData.hotspots?.join(", ") : ""}
                </li>
                <li>
                  <strong>Subjects:</strong>{" "}
                  {teacherData ? teacherData.subjects?.join(", ") : ""}
                </li>
                <li>
                  <strong>Level of Teaching:</strong>{" "}
                  {teacherData ? teacherData.levelOfTeaching?.join(", ") : ""}
                </li>
                <li>
                  <strong>Mode of Teaching:</strong>{" "}
                  {teacherData ? teacherData.modeOfTeaching?.join(", ") : ""}
                </li>
                <li>
                  <strong>Years of Experience:</strong>{" "}
                  {teacherData ? teacherData.yearsOfExperience : ""}
                </li>
                <li>
                  <strong>Achievements:</strong>{" "}
                  {teacherData ? teacherData.achievements?.join(", ") : ""}
                </li>
                <li>
                  <strong>Name of Qualifications:</strong>{" "}
                  {teacherData
                    ? teacherData.nameOfQualification?.join(", ")
                    : ""}
                </li>
                <li>
                  <strong>Advertisement of Teacher:</strong>{" "}
                  {teacherData ? teacherData.advertisementOfTeacher : ""}
                </li>
                <li>
                  <strong>Monthly Charges:</strong>{" "}
                  {teacherData ? teacherData.monthlyCharges : ""}
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
