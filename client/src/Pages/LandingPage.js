import React from "react";

import HeroSection_landingPage from "../Components/HeroSection_landingPage";

const LandingPage = () => {
  return (
    <>
      <div className="bg-white">
        <nav className="grid grid-rows-[min-content] grid-cols-1 py-0 px-0 mb-4 bg-transparent text-black shadow-xl">
          <div className="row-span-1 grid  items-center justify-center">
            <img
              src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697219509/tutorlok_logo_final_kxarwk.png"
              alt="Logo"
              className="h-16 w-60 my-2 p-0" // Adjust the height and width as needed
            />
          </div>
          <ul className="row-span-1 flex justify-center space-x-4 text-lg p-4">
            <li>
              <a href="#" className="text-black hover:text-gray-400">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
        <main>
          <div className="hero-section ">
            <HeroSection_landingPage />
          </div>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
