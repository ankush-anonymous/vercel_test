import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const TeacherNavbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
    // Add any additional logout logic here
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="bg-transparent py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-gray-800 p-2 rounded-md"
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu />
            </button>
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="flex items-center">
                  <img
                    src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697219509/tutorlok_logo_final_kxarwk.png"
                    alt="Logo"
                    className="h-14" // Increased size of the logo
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex mr-5  w-fit">
            <button
              className="bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-900 rounded transform transition-transform hover:scale-110 active:scale-95 hover:shadow-md active:shadow-sm"
              onClick={() => navigate("/teacher-login")}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 overflow-y-auto">
          <div className="flex justify-end p-4">
            <button className="text-white">
              <AiOutlineClose onClick={toggleSidebar} />
            </button>
          </div>
          <div className="flex items-center justify-center h-16">
            <img
              src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697219509/tutorlok_logo_final_kxarwk.png"
              alt="Logo"
              className="h-10" // Adjusted logo size
            />
          </div>
          <ul className="space-y-4 mt-8 px-12 py-6">
            <li className="py-3   hover:font-semibold ">
              <Link to="/admin/home" className="block ">
                Dashboard
              </Link>
            </li>
            <li className="py-3  hover:font-semibold ">
              <Link to="/admin/employee-details" className="block ">
                Profile Page
              </Link>
            </li>
            <li className="py-3  hover:font-semibold ">
              <Link to="/admin/roles" className="block ">
                Analytics
              </Link>
            </li>
            <li className="py-3  hover:font-semibold ">
              <Link to="/doctorSec/create-slot" className="block ">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TeacherNavbar;
