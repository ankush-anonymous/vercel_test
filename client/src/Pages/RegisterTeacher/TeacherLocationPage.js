import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavbarRegister from "../../Components/NavbarRegister";
import { CgDanger } from "react-icons/cg";
import { AiOutlineEnvironment } from "react-icons/ai";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const TeacherLocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current location

  // Access the _id query parameter
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("_id");
  // console.log(_id);

  const [blockNo, setBlockNo] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinNumber, setPinNumber] = useState(""); // Initialize with false
  const [selectedHotspots, setSelectedHotspots] = useState([]);

  const handleHotspotClick = (hotspot) => {
    if (selectedHotspots.includes(hotspot)) {
      setSelectedHotspots(selectedHotspots.filter((h) => h !== hotspot));
    } else {
      setSelectedHotspots([...selectedHotspots, hotspot]);
    }
  };

  const isHotspotSelected = (hotspot) => {
    return selectedHotspots.includes(hotspot);
  };

  // Function to send the updated teacher data to the back-end
  const updateTeacherProfile = (teacherId, updatedData) => {
    if (!blockNo || !locality || !city || !state || !pinCode) {
      NotificationManager.error("Please fill out all address fields.");
      return;
    }

    if (selectedHotspots.length === 0) {
      NotificationManager.error("Please select at least one hotspot.");
      return;
    }

    // Replace 'your-api-url' with your actual API endpoint
    const apiUrl = `api/v1/teacher/update-user/${teacherId}`;

    axios
      .patch(apiUrl, updatedData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          NotificationManager.success(
            "Teacher profile updated successfully",
            "Success",
            2000
          );
          navigate(`/teacher-register/subjects?_id=${id}`);
          // Handle other success actions
        } else {
          // Handle errors
          console.log("fail");
          NotificationManager.error(
            "Teacher profile update failed",
            "Error",
            2000
          );
        }
      })
      .catch((error) => {
        // Handle other errors
        NotificationManager.error(
          "An error occurred while updating teacher profile",
          "Error",
          2000
        );
      });
  };

  const handleUpdateProfile = () => {
    // Construct the teachersAddress object with state variables
    console.log("first");
    const teachersAddress = {
      buildingOrHouseNumber: blockNo,
      locality: locality,
      city: city,
      state: state,
      pinCode: pinCode,
    };
    const updatedData = {
      teachersAddress: teachersAddress,
      hotspots: selectedHotspots,
      // Add other data you want to update
    };

    // Call the updateTeacherProfile function to send the data to the backend
    updateTeacherProfile(id, updatedData);

    // The rest of your update logic...
  };

  return (
    <>
      <div className="bg-gradient-to-b from-pink-300 via-pink-200 to-transparent h-screen">
        <NavbarRegister />

        <main className="lg:flex">
          {/* Left Section */}
          <div className="lg:w-1/2 p-4">
            <div className="col-span-2 flex items-center justify-center p-5">
              <AiOutlineEnvironment className="text-3xl" />
              <h1 className="font-bold text-3xl">
                <span className="text-orange-500">Your </span>Location
              </h1>
            </div>
            <div>
              {/* Section 1: Inputs */}
              <section className="p-4">
                <div className="p-2">
                  <label
                    htmlFor="blockNo"
                    className="text-gray-600 font-semibold"
                  >
                    Block no./Flat no./Road no.:
                  </label>
                  <input
                    type="text"
                    id="blockNo"
                    name="blockNo"
                    placeholder="Enter Block/Flat/Road no."
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    value={blockNo}
                    onChange={(e) => setBlockNo(e.target.value)}
                  />
                </div>
                <div className="p-2">
                  <label
                    htmlFor="locality"
                    className="text-gray-600 font-semibold"
                  >
                    Locality:
                  </label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    placeholder="Enter Locality"
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                  />
                </div>
                <div className="p-2">
                  <label htmlFor="city" className="text-gray-600 font-semibold">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter City"
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="p-2">
                  <label
                    htmlFor="state"
                    className="text-gray-600 font-semibold"
                  >
                    State:
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter State"
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="p-2">
                  <label
                    htmlFor="pinCode"
                    className="text-gray-600 font-semibold"
                  >
                    PIN CODE:
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    placeholder="Enter PIN CODE (6 digits)"
                    className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </section>

              {/* Right Section (Good to Know Box) */}
              <div className="">
                <section className="lg:w-1/2 bg-pink-300 rounded p-4 m-4 ml-3 lg:hidden  lg:ml-20">
                  <div>
                    <div className="flex items-center mb-2">
                      <CgDanger className="text-orange-500 mr-2 text-2xl" />
                      <h3 className="font-bold text-xl">Good to Know</h3>
                    </div>
                    <p>Kindly, input your Primary location & Hotspot here.</p>
                    <br />
                    <h3 className="font-semibold">Primary Address:</h3>
                    <p>
                      Your Home address/your first priority for conducting
                      classes.
                    </p>
                    <br />
                    <h3 className="font-semibold">Hotspot:</h3>
                    <p>
                      A famous location/landmark, near your Primary Address.
                    </p>
                  </div>
                </section>
              </div>
              {/* Section 3: "Select Your Hotspots" Buttons */}
              <section className="p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Select Your Hotspots
                </h2>
                <div className="flex space-x-4">
                  <button
                    className={`${
                      isHotspotSelected("NIT")
                        ? "bg-pink-600 text-white"
                        : "bg-gray-400 text-black"
                    } font-bold py-2 px-4 rounded`}
                    onClick={() => handleHotspotClick("NIT")}
                  >
                    NIT
                  </button>
                  <button
                    className={`${
                      isHotspotSelected("4 No. Road")
                        ? "bg-pink-600 text-white"
                        : "bg-gray-400 text-black"
                    } font-bold py-2 px-4 rounded`}
                    onClick={() => handleHotspotClick("4 No. Road")}
                  >
                    4 No. Road
                  </button>
                  <button
                    className={`${
                      isHotspotSelected("MIG")
                        ? "bg-pink-600 text-white"
                        : "bg-gray-400 text-black"
                    } font-bold py-2 px-4 rounded`}
                    onClick={() => handleHotspotClick("MIG")}
                  >
                    MIG
                  </button>
                </div>
              </section>

              <div className="flex justify-center items-center mb-5">
                <button
                  className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded text-lg my-5"
                  onClick={handleUpdateProfile}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:p-10 lg:block">
            <section className="lg:w-1/2 bg-pink-300 rounded p-4 m-4 ml-3  lg:flex lg:ml-20">
              <div>
                <div className="flex items-center mb-2">
                  <CgDanger className="text-orange-500 mr-2 text-2xl" />
                  <h3 className="font-bold text-xl">Good to Know</h3>
                </div>
                <p>Kindly, input your Primary location & Hotspot here.</p>
                <br />
                <h3 className="font-semibold">Primary Address:</h3>
                <p>
                  Your Home address/your first priority for conducting classes.
                </p>
                <br />
                <h3 className="font-semibold">Hotspot:</h3>
                <p>A famous location/landmark, near your Primary Address.</p>
              </div>
            </section>
          </div>
        </main>

        <NotificationContainer />
      </div>
    </>
  );
};

export default TeacherLocationPage;
