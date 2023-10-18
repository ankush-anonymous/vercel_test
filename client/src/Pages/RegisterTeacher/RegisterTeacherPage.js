import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarRegister from "../../Components/NavbarRegister";

const RegisterTeacherPage = () => {
  const navigate = useNavigate();

  const navigateToTeacherLogin = () => {
    navigate("/teacher-login");
  };

  return (
    <div className="bg-gradient-to-b from-pink-500 via-pink-300 to-transparent min-h-screen flex flex-col items-center">
      <NavbarRegister />

      <main className="flex justify-center items-center flex-1 mt-7">
        <div className="bg-white grid grid-rows-[min-content] grid-cols-1 mx-2 p-4 rounded-lg">
          <div className="rounded p-4 text-black text-left">
            <p className="text-xl font-bold">Unlock your teaching potential.</p>
            <p className="text-lg">Connect with students today!</p>
          </div>
          <img
            src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697220519/TutorLok/Teacher-icon.png"
            alt="Teacher Icon"
            className="h-96 w-60 my-2 mx-9 p-0"
          />
          <div className="text-center">
            <button
              className="bg-pink-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/teacher-register/info")}
            >
              Register
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterTeacherPage;
