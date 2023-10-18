import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";

import LandingPage from "../src/Pages/LandingPage";
import RegisterTeacherPage from "./Pages/RegisterTeacher/RegisterTeacherPage";
import TeacherInfoPage from "./Pages/RegisterTeacher/TeacherInfoPage";
import TeacherLocationPage from "./Pages/RegisterTeacher/TeacherLocationPage";
import TeacherSubjectsPage from "./Pages/RegisterTeacher/TeacherSubjectsPage";
import TeacherAdvertisePage from "./Pages/RegisterTeacher/TeacherAdvertisePage";
import TeacherQualificationPage from "./Pages/RegisterTeacher/TeacherQualificationPage";
import TeacherExpirencePage from "./Pages/RegisterTeacher/TeacherExpirencePage";
import LoginTeacherPage from "./Pages/LoginTeacherPage";
import DashboardPage from "./Pages/TeacherPortal/DashboardPage";
import HomePage from "./Pages/TeacherPortal/HomePage";
axios.defaults.baseURL = "http://localhost:5000"; // Change this URL to your backend API URL
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/teacher-login" element={<LoginTeacherPage />} />
          <Route path="/teacher-register" element={<RegisterTeacherPage />} />
          <Route path="/teacher-register/info" element={<TeacherInfoPage />} />
          <Route
            path="/teacher-register/location"
            element={<TeacherLocationPage />}
          />
          <Route
            path="/teacher-register/subjects"
            element={<TeacherSubjectsPage />}
          />
          <Route
            path="/teacher-register/advertise"
            element={<TeacherAdvertisePage />}
          />
          <Route
            path="/teacher-register/qualification"
            element={<TeacherQualificationPage />}
          />
          <Route
            path="/teacher-register/experience"
            element={<TeacherExpirencePage />}
          />
          <Route path="/teacher/dashboard" element={<DashboardPage />} />
          <Route path="/teacher" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
