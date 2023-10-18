import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavbarRegister = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex items-center justify-between bg-transparent text-black shadow-lg w-screen">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697219509/tutorlok_logo_final_kxarwk.png"
            alt="Logo"
            className="h-14 w-56 my-2 p-0" // Adjust the height and width as needed
          />
        </div>
        <div className="flex mr-5  w-fit">
          <button
            className="bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-900 rounded transform transition-transform hover:scale-110 active:scale-95 hover:shadow-md active:shadow-sm"
            onClick={() => navigate("/teacher-login")}
          >
            Go to Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavbarRegister;
