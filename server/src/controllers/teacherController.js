const User = require("../models/teacherSchema");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const cloudinary = require("../services/cloudinary");

const login = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    throw new BadRequestError("Please provide phone number");
  }
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, token, phoneNumber });
};

const createTeacher = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({
        user: { name: user.name, _id: user._id, phoneNumber: user.phoneNumber },
        token,
      });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email or phone number already exists." });
    } else {
      console.error("Error creating user:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to create user." });
    }
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      email,
      phoneNumber,
      location,
      subjects,
      gender,
      modeOfTeaching,
      yearsOfExperience,
      rating,
      monthlyCharges,
      isApproved,
    } = req.query;

    const queryObject = {};

    if (name) {
      queryObject.name = name;
    }
    if (dateOfBirth) {
      queryObject.dateOfBirth = dateOfBirth;
    }
    if (email) {
      queryObject.email = email;
    }
    if (phoneNumber) {
      queryObject.phoneNumber = phoneNumber;
    }
    if (location) {
      queryObject.location = location;
    }
    if (subjects) {
      queryObject.subjects = subjects;
    }
    if (gender) {
      queryObject.gender = gender;
    }
    if (modeOfTeaching) {
      queryObject.modeOfTeaching = modeOfTeaching;
    }
    if (yearsOfExperience) {
      queryObject.yearsOfExperience = yearsOfExperience;
    }
    if (rating) {
      queryObject.rating = rating;
    }
    if (monthlyCharges) {
      queryObject.monthlyCharges = monthlyCharges;
    }
    if (isApproved) {
      queryObject.isApproved = isApproved;
    }

    const teachers = await User.find(queryObject);

    res.status(StatusCodes.OK).json({ teachers, count: teachers.length });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching teachers", error: error.message });
  }
};

const getSingleTeacher = async (req, res) => {
  try {
    // Get the teacher's _id from the request parameters
    const { _id } = req.params;

    // Find the teacher by _id
    const teacher = await User.findById(_id);

    // If the teacher is not found, return a not found response
    if (!teacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Teacher not found." });
    }

    // Respond with the found teacher
    res.status(StatusCodes.OK).json({ user: teacher });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching teacher", error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    // Extract data from the request body
    const { password, ...updateData } = req.body;

    // Get the teacher's _id from the request parameters
    const { _id } = req.params;

    // Find the teacher by _id
    const teacher = await User.findById(_id);

    // If the teacher is not found, return a not found response
    if (!teacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Teacher not found." });
    }

    // Conditionally hash and save the password if provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      teacher.password = hashedPassword;
    }

    // Update other fields from the request body
    for (const key in updateData) {
      teacher[key] = updateData[key];
    }

    // Update the 'updatedAt' field with the current date and time
    teacher.updatedAt = new Date();

    // Save the updated teacher to the database
    const updatedTeacher = await teacher.save();

    // Respond with a success message
    res.status(StatusCodes.OK).json({ user: { updatedTeacher } });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email or phone number already exists." });
    } else {
      console.error("Error updating user:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to update user." });
    }
  }
};

const deleteTeacher = async (req, res) => {
  try {
    // Get the teacher's _id from the request parameters
    const { _id } = req.params;

    // Find and delete the teacher by _id
    const deletedTeacher = await User.findByIdAndDelete(_id);

    // If the teacher is not found, return a not found response
    if (!deletedTeacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Teacher not found." });
    }

    // Respond with a success message
    res.status(StatusCodes.OK).json({
      message: "Teacher deleted successfully",
      user: deletedTeacher,
    });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting teacher", error: error.message });
  }
};

const getTeacherByPhoneNumber = async (req, res) => {
  try {
    // Get the phoneNumber from the route parameters
    const { phoneNumber } = req.params;

    // Find the teacher by phoneNumber
    const teacher = await User.findOne({ phoneNumber });

    // If the teacher is not found, return a not found response
    if (!teacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Teacher not found." });
    }

    // Respond with the found teacher
    res.status(StatusCodes.OK).json({ user: teacher });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching teacher", error: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherByPhoneNumber,
  login,
};
