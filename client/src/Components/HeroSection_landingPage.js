import React, { useState, useEffect } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from React Router

const HeroSection_landingPage = () => {
  const gradientList = [
    {
      startColor: "from-pink-500",
      viaColor: "via-pink-500",
      endColor: "to-pink-200",
    },
    {
      startColor: "from-red-400",
      viaColor: "via-red-400",
      endColor: "to-red-200",
    },
  ];

  const imageList = [
    "https://res.cloudinary.com/dlrlxxoue/image/upload/v1697220519/TutorLok/Teacher-icon.png",
    "https://res.cloudinary.com/dlrlxxoue/image/upload/v1697222997/TutorLok/Student-icon.png",
  ];

  const loginTexts = ["Teacher's Login", "Student's Login"];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % imageList.length);
        setTransitioning(false);
      }, 500); // Delay the transition for 500ms
    }, 10000); // Adjust the interval as needed (e.g., 10000ms for 10 seconds).

    return () => {
      clearInterval(interval);
    };
  }, [imageList.length]);

  const handleNext = () => {
    if (!isTransitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % imageList.length);
        setTransitioning(false);
      }, 500); // Delay the transition for 500ms
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === 0 ? imageList.length - 1 : prevSlide - 1
        );
        setTransitioning(false);
      }, 500); // Delay the transition for 500ms
    }
  };

  const cardClickDestination =
    currentSlide === 0 ? "/teacher-login" : "/student-login";

  return (
    <div className="hero-section h-80vh relative">
      <div className="grid grid-cols-1 grid-rows-1 rounded-md mx-4">
        <div
          className={`bg-gradient-to-b ${
            gradientList[currentSlide].startColor
          } ${gradientList[currentSlide].viaColor} ${
            gradientList[currentSlide].endColor
          } rounded-md text-left p-4 h-auto grid-auto-rows transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-80" : "opacity-100"
          }`}
        >
          <h1 className="text-white text-4xl">Your bright future</h1>
          <h2 className="text-white text-3xl">
            is our <span>mission</span>
          </h2>
          <div className="my-2">
            <p className="text-gray-300 text-xl">
              Our website is your one-stop solution for locating experienced and
              qualified tuition teachers in your local area.
            </p>
            <p className="text-white text-xl">We have got you covered.</p>
          </div>
          <div className="grid-auto-rows h-auto">
            <div className="grid-item2 flex justify-center relative">
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={handlePrevious}
              >
                <FiArrowLeftCircle size={32} />
              </button>
              <Link to={cardClickDestination}>
                <img
                  src={imageList[currentSlide]}
                  alt="Logo"
                  className={`h-96 w-60 my-2 p-0 transition-all duration-500 ease-in-out ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                />
              </Link>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={handleNext}
              >
                <FiArrowRightCircle size={32} />
              </button>
            </div>
          </div>
          <div className="text-white text-4xl mt-2 text-center font-bold">
            <Link to={currentSlide === 0 ? "/teacher-login" : "/student-login"}>
              {loginTexts[currentSlide]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection_landingPage;
